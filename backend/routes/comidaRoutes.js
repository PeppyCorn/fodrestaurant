import express from "express";
import multer from "multer";
import Comida from "../models/Comida.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, tempoPreparo, disponibilidade, adicionais } = req.body;

    const novaComida = new Comida({
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      tempoPreparo,
      disponibilidade: disponibilidade === "true",
      adicionais: adicionais ? JSON.parse(adicionais) : [],
      imagem: req.file?.filename,
    });

    await novaComida.save();
    res.status(201).json(novaComida);
  } catch (error) {
    console.error("❌ Erro ao criar comida:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const comidas = await Comida.find();
    res.json(comidas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comida = await Comida.findById(req.params.id);
    if (!comida) {
      return res.status(404).json({ message: "Comida não encontrada" });
    }
    res.json(comida);
  } catch (error) {
    console.error("Erro ao buscar comida:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.put("/:id", upload.single("imagem"), async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, categoria, tempoPreparo, disponibilidade, adicionais } = req.body;

  try {
    const updateData = {
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      tempoPreparo,
      disponibilidade: disponibilidade === "true",
      adicionais: adicionais ? JSON.parse(adicionais) : [],
    };

    if (req.file) {
      updateData.imagem = req.file.filename; 
    }

    const comidaAtualizada = await Comida.findByIdAndUpdate(id, updateData, { new: true });

    if (!comidaAtualizada) {
      return res.status(404).json({ message: "Comida não encontrada" });
    }

    res.json(comidaAtualizada);
  } catch (error) {
    console.error("❌ Erro ao atualizar comida:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// 📌 Rota para deletar uma comida
router.delete("/:id", async (req, res) => {
  try {
    const comidaDeletada = await Comida.findByIdAndDelete(req.params.id);
    if (!comidaDeletada) {
      return res.status(404).json({ message: "Comida não encontrada" });
    }
    res.json({ message: "Comida deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar comida" });
  }
});

export default router;
