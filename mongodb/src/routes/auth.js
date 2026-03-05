import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

// -------------------------
// REGISTRO
// -------------------------
router.post("/register", async (req, res) => {
  try {
    const { email, password, avatar } = req.body;

    // Validación SIN avatar obligatorio
    if (!email || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    // Comprobar si ya existe
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: "Usuario ya existe" });
    }

    // Encriptar password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario (avatar opcional)
    const user = await User.create({
      email,
      passwordHash,
      avatar: avatar || {}   // avatar vacío si no se envía
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      userId: user._id
    });

  } catch (err) {
    console.error("Error en /register:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// -------------------------
// LOGIN
// -------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      userId: user._id,
      avatar: user.avatar
    });

  } catch (err) {
    console.error("Error en /login:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

export default router;

import { generateAvatarPNG } from "../utils/generateAvatar.js";

// -------------------------
// ACTUALIZAR AVATAR
// -------------------------
router.post("/avatar/update", async (req, res) => {
  try {

    const { userId, avatar } = req.body;

    if (!userId || !avatar) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    // Generar PNG final
    await generateAvatarPNG(userId, avatar);

    res.json({
      message: "Avatar actualizado",
      avatar: user.avatar
    });

  } catch (err) {
    console.error("Error actualizando avatar:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});
