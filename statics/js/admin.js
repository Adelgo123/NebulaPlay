import express from "express";
import mongoose from "mongoose";
import path from "path";
import User from "../models/user.js";

const router = express.Router();

// Modelo Game
const gameSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String
});
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema, "games");

// Middleware admin root
function isAdmin(req,res,next){
  const token = req.headers["authorization"];
  if(token === "Bearer root-token") next();
  else res.status(403).json({ error: "No autorizado" });
}

// ===== GAMES =====
router.get("/games", isAdmin, async (req,res)=>{
  const games = await Game.find().limit(100);
  res.json(games);
});

router.post("/games", isAdmin, async (req,res)=>{
  const game = new Game(req.body);
  await game.save();
  res.json(game);
});

router.delete("/games/:id", isAdmin, async (req,res)=>{
  await Game.findByIdAndDelete(req.params.id);
  res.json({ mensaje:"Juego eliminado" });
});

// ===== USERS =====
router.get("/users", isAdmin, async (req,res)=>{
  const users = await User.find().limit(100);
  res.json(users);
});

router.get("/users/activos", isAdmin, async (req,res)=>{
  const users = await User.find({ lastLoginIP: { $ne: "" } }).limit(100);
  res.json(users);
});

router.put("/users/:id", isAdmin, async (req,res)=>{
  try{
    const data = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  }catch(err){
    res.status(500).json({ error:"Error al actualizar usuario" });
  }
});

// Servir admin.html
router.get("/", (req,res)=>{
  res.sendFile(path.join(process.cwd(),"admin/admin.html"));
});

export default router;