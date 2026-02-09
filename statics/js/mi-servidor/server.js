import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

// Importar rutas de autenticación
import authRoutes from "../../../mongodb/src/routes/auth.js"; // Ajusta si es necesario

const app = express();

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../../..")));

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/NebulaPlay")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Captcha
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

// Modelo de usuario
const userSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  usuario: String,
  correo: String,
  contraseña: String,
  genero: String,
  pais: String,
  fecha_nacimiento: Date
});

const Users = mongoose.model("usuarios", userSchema);

// Ruta para guardar formulario
app.post("/post", async (req, res) => {
  const { nombre, apellidos, usuario, correo, contraseña, genero, pais, fecha_nacimiento } = req.body;

  const user = new Users({
    nombre,
    apellidos,
    usuario,
    correo,
    contraseña,
    genero,
    pais,
    fecha_nacimiento
  });

  await user.save();
  console.log(user);
  res.send("Formulario enviado correctamente");
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Base de datos");
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});


document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    // validar aquí...
    window.location.href = "./panelusuario/index.html";
});
