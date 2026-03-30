// servidor-web.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Crear app
const app = express();

// Necesario para rutas absolutas en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ===============================
// SERVIR ARCHIVOS ESTÁTICOS
// ===============================

// Sirve tu carpeta REAL donde está pantallajuego.html
// Ruta real: NebulaPlay/panelusuario
app.use('/pantallajuego', express.static(path.join(__dirname, '..', 'panelusuario')));

// Sirve tu carpeta statics (JS, CSS, etc.)
app.use('/statics', express.static(path.join(__dirname, '..', 'statics')));

// ===============================
// ENDPOINTS WEBRTC
// ===============================

// Recibe la offer del navegador y la reenvía al servidor Pion
app.post('/api/webrtc/offer', async (req, res) => {
  const offer = req.body;

  console.log("📤 Reenviando offer al servidor de juegos...");

  try {
    const resp = await fetch('http://192.168.1.173:8000/offer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    });

    const answer = await resp.json();

    console.log("📥 Answer recibida desde el servidor de juegos");

    res.json(answer);

  } catch (err) {
    console.error("❌ Error reenviando offer:", err);
    res.status(500).json({ error: "No se pudo conectar con el servidor de juegos" });
  }
});

// Recibe ICE candidates del navegador
app.post('/api/webrtc/candidate', (req, res) => {
  console.log("📨 Candidate recibido del navegador");
  res.sendStatus(200);
});

// ===============================
// INICIAR SERVIDOR
// ===============================
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor web en http://192.168.1.175:3000');
});
