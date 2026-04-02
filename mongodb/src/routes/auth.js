import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// 🔐 secreto (luego lo pasamos a .env)
const JWT_SECRET = "secreto_super_seguro";

// -------------------------
// REGISTRO
// -------------------------
router.post("/register", async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      usuario,
      email,
      password,
      genero,
      pais,
      fecha_nacimiento,
      novedades
    } = req.body;

    // Validación básica
    if (!email || !password || !usuario) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    // Verificar duplicados
    const exists = await User.findOne({
      $or: [{ email }, { usuario }]
    });

    if (exists) {
      return res.status(409).json({ error: "Usuario o email ya existe" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      nombre,
      apellidos,
      usuario: usuario.toLowerCase(),
      email,
      passwordHash,
      genero,
      pais,
      fecha_nacimiento,
      novedades: novedades === "on",
      role: "user"
    });

    // generar token también al registrarse (mejor UX)
const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role
  },
  JWT_SECRET,
  { expiresIn: "2h" }
);

res.json({
  message: "Usuario registrado",
  token
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

    // Verificar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    

    // Obtener IP
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Guardar IP
    user.lastLoginIP = ip;
    await user.save();

    // 🔥 GENERAR TOKEN JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // RESPUESTA
    res.json({
      message: "Login exitoso",
      token
    });

  } catch (err) {
    console.error("Error en /login:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// -------------------------
// LOGOUT
// -------------------------

function logout(){
  localStorage.removeItem("token");
  window.location.href = "/index.html";
}
// 👉 Con JWT no hay logout en servidor
// 👉 simplemente se borra el token en frontend


export default router;