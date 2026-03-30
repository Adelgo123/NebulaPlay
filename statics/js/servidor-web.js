// servidor-web.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// ===============================
// SERVIR ARCHIVOS ESTÁTICOS
// ===============================

// Sirve la carpeta REAL donde está pantallajuego.html
app.use('/pantallajuego', express.static(path.join(__dirname, '..', '..', 'pantallajuego')));

// Sirve statics
app.use('/statics', express.static(path.join(__dirname, '..', '..', 'statics')));

// ===============================
// ENDPOINTS WEBRTC
// ===============================

app.post('/api/webrtc/offer', async (req, res) => {
  const offer = req.body;

  console.log("📤 Reenviando offer al servidor de juegos...");

  try {
    const resp = await fetch("http://localhost:8000/offer", {
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

app.post('/api/webrtc/candidate', (req, res) => {
  console.log("📨 Candidate recibido del navegador");
  res.sendStatus(200);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor web en http://localhost:3000');
});
