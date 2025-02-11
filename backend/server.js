import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import multer from "multer";
import cookieParser from "cookie-parser";
import comidaRoutes from "./routes/comidaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import Comida from "./models/Comida.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI
const SECRET_KEY = process.env.REACT_APP_API_KEY

console.log("🚀 O servidor está iniciando...");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch((error) => console.error("❌ Erro ao conectar ao MongoDB:", error));

mongoose.connection.on("error", (err) => {
  console.error("🚨 Erro na conexão com o MongoDB:", err);
});

mongoose.set("debug", true);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const verificarAutenticacao = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token não fornecido ou mal formatado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res.status(401).json({ message: "Token inválido" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/comidas", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, descricao, preco, tempoPreparo, disponibilidade, adicionais, categoria } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Imagem é obrigatória" });
    }

    if (!categoria) {
      return res.status(400).json({ error: "O campo 'categoria' é obrigatório" });
    }

    let adicionaisArray = [];
    try {
      adicionaisArray = JSON.parse(adicionais);

      if (!Array.isArray(adicionaisArray) || !adicionaisArray.every(item => typeof item === 'object')) {
        throw new Error("adicionais deve ser um array de objetos");
      }
    } catch (error) {
      return res.status(400).json({ error: "O campo 'adicionais' deve ser um array de objetos válidos" });
    }


    const novaComida = new Comida({
      nome,
      descricao,
      preco,
      tempoPreparo,
      disponibilidade,
      categoria,
      adicionais: adicionaisArray,
      imagem: req.file.filename,
    });

    await novaComida.save();
    res.status(201).json(novaComida);
  } catch (error) {
    console.error("Erro ao cadastrar comida:", error);
    res.status(500).json({ error: "Erro ao cadastrar comida" });
  }
});



// 📌 Middleware para verificar se é admin
const verificarAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acesso negado. Apenas admins podem acessar." });
  }
  next();
};

app.put("/comidas/:id",verificarAutenticacao, upload.single("imagem"), async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, categoria } = req.body;
    const imagem = req.file ? req.file.filename : null;

    try {
      const comidaExistente = await Comida.findById(id);
      if (!comidaExistente) {
        return res.status(404).json({ message: "Comida não encontrada" });
      }

      if (nome) comidaExistente.nome = nome;
      if (descricao) comidaExistente.descricao = descricao;
      if (preco) comidaExistente.preco = preco;
      if (categoria) comidaExistente.categoria = categoria;
      if (imagem) comidaExistente.imagem = imagem;

      const comidaAtualizada = await comidaExistente.save();
      res.status(200).json(comidaAtualizada);
    } catch (erro) {
      res.status(500).json({ message: "Erro ao atualizar comida" });
    }
  }
);

app.delete("/comidas/:id", async (req, res) => {
  const { id } = req.params;
  const comida = await Comida.findById(id);

  if (!comida) {
    return res.status(404).json({ message: "Comida não encontrada" });
  }

  await Comida.findByIdAndDelete(id);
  res.json({ message: "Comida deletada com sucesso!" });
});

app.use("/auth", authRoutes);

app.use("/comidas", comidaRoutes);

app.use("/admin", verificarAutenticacao, verificarAdmin, comidaRoutes);

app.get("/test-db", async (req, res) => {
  const status = mongoose.connection.readyState;
  res.json({ status });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
);
