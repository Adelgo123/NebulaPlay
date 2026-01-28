import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

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

export default router;
