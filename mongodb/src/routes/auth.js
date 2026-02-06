import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { email, password, avatar } = req.body;

    if (!email || !password || !avatar) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: "Usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      avatar
    });

    res.status(201).json({
      message: "Usuario creado",
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Login correcto
    res.json({
      message: "Login exitoso",
      userId: user._id,
      avatar: user.avatar
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

export default router;
