import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.REACT_APP_API_KEY

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ message: "E-mail já cadastrado." });
    }
    const novoUsuario = new Usuario({ nome, email, senha, role });
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
});

// Rota de Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: usuario.role, nome: usuario.nome });
  } catch (error) {
    console.error("❌ Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro ao fazer login." });
  }
});


router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido ou mal formatado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ id: decoded.id, role: decoded.role });
  } catch (error) {
    console.error("❌ Erro ao verificar token:", error);
    res.status(401).json({ message: "Token inválido" });
  }
});

router.get("/me", (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Não autenticado" });
  }

  try {
      const decoded = jwt.verify(token, SECRET_KEY);
      res.json({ id: decoded.id, role: decoded.role });
  } catch (error) {
      console.error("❌ Erro ao verificar token:", error);
      res.status(401).json({ message: "Token inválido" });
  }
});

export default router;
