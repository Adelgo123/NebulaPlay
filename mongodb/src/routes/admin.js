import express from "express";
import mongoose from "mongoose";
import path from "path";

// Importa el User correctamente (default export)
import User from "../models/user.js"; // Ajusta la ruta según tu proyecto

const router = express.Router();

// ===============================
// MODELO GAME
// ===============================
const gameSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String
});

// Evita OverwriteModelError
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema, "games");

// ===============================
// MIDDLEWARE ADMIN SIMPLE
// ===============================
function isAdmin(req, res, next) {
  const token = req.headers["authorization"];
  if(token === "Bearer root-token") next();
  else res.status(403).json({ error: "No autorizado" });
}

// ===============================
// API GAMES
// ===============================
router.get("/games", isAdmin, async (req, res) => {
  try {
    const games = await Game.find().limit(100);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener juegos" });
  }
});

router.post("/games", isAdmin, async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Error creando juego" });
  }
});

router.delete("/games/:id", isAdmin, async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Juego eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error eliminando juego" });
  }
});

// ===============================
// API USERS
// ===============================
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().limit(100);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// ===============================
// SERVIR HTML ADMIN
// ===============================
router.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "admin/admin.html"));
});

export default router;