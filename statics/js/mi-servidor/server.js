// ===============================
// IMPORTS
// ===============================
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import cors from "cors";

// Rutas de autenticación
import authRoutes from "../../../mongodb/src/routes/auth.js";

// ===============================
// CONFIGURACIÓN BASE
// ===============================
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// CONEXIÓN A MONGODB
// ===============================
mongoose
  .connect("mongodb://localhost:27017/NebulaPlay")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// ===============================
// SERVIR FRONTEND COMPLETO
// ===============================

// Sirve TODO NebulaPlay como raíz
const rootPath = path.join(__dirname, "../../..");
app.use(express.static(rootPath));

// Sirve carpeta pantallajuego
app.use(
  "/pantallajuego",
  express.static(path.join(rootPath, "pantallajuego"))
);

// Sirve carpeta statics
app.use(
  "/statics",
  express.static(path.join(rootPath, "statics"))
);

// ===============================
// RUTA RAÍZ → index.html
// ===============================
app.get("/", (req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});

// ===============================
// RUTAS DE AUTENTICACIÓN
// ===============================
app.use("/api/auth", authRoutes);

// ===============================
// CAPTCHA
// ===============================
app.post("/submit", async (req, res) => {
  const token = req.body["h-captcha-response"];

  const result = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: "ES_96fba520d40140cc84d2392557ceabef",
      response: token
    })
  });

  const usuarios = await result.json();

  if (usuarios.success) {
    res.send("Verificación correcta");
  } else {
    res.send("Verificación fallida");
  }
});

// ===============================
// ENDPOINTS WEBRTC
// ===============================
app.post("/api/webrtc/offer", async (req, res) => {
  const offer = req.body;

  console.log("📤 Reenviando offer al servidor de juegos...");

  try {
    const resp = await fetch("http://localhost:8000/offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offer)
    });

    const answer = await resp.json();

    console.log("📥 Answer recibida desde el servidor de juegos");

    res.json(answer);
  } catch (err) {
    console.error("❌ Error reenviando offer:", err);
    res
      .status(500)
      .json({ error: "No se pudo conectar con el servidor de juegos" });
  }
});

app.post("/api/webrtc/candidate", async (req, res) => {
  const candidate = req.body;

  console.log("📨 Candidate recibido del navegador, reenviando al servidor de juegos...");

  try {
    await fetch("http://localhost:8000/candidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidate)
    });

    res.sendStatus(200);

  } catch (err) {
    console.error("❌ Error reenviando candidate al servidor de juegos:", err);
    res.status(500).json({ error: "No se pudo reenviar el candidate" });
  }
});


// ===============================
// INICIAR SERVIDOR
// ===============================
app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor unificado corriendo en http://localhost:3000");
});
