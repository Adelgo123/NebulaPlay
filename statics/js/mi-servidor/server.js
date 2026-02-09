import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

// Importar rutas de autenticación
import authRoutes from "../../../mongodb/src/routes/auth.js";

const app = express();

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (tu frontend)
app.use(express.static(path.join(__dirname, "../../..")));

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/NebulaPlay")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// -------------------------
// CAPTCHA (lo dejo igual)
// -------------------------
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

// -------------------------
// ELIMINADO: /post y modelo usuarios
// -------------------------

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
