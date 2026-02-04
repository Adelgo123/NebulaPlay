import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// ES module fix para __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../../..")));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta del captcha
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

  const data = await result.json();

  if (data.success) {
    res.send("Verificación correcta");
  } else {
    res.send("Verificación fallida");
  }
});

// Rutas de autenticación
import authRoutes from "../../../mongodb/src/routes/auth.js";
app.use("/api/auth", authRoutes);

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/NebulaPlay")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Base de datos");
});

// Formulario
const userSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  usuario: String,
  correo: String
});

const Users = mongoose.model("data", userSchema);

app.post("/post", async (req, res) => {
  const { nombre, apellidos, usuario, correo } = req.body;

  const user = new Users({
    nombre,
    apellidos,
    usuario,
    correo
  });

  await user.save();
  console.log(user);
  res.send("Formulario enviado correctamente");
});

// Iniciar servidor
app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:${3000}`);
});