// servidor-web.js
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Necesario para rutas absolutas en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SERVIR TU CARPETA REAL DE HTML
app.use('/pantallajuego', express.static(path.join(__dirname, '..', '..', 'pantallajuego')));
app.use('/statics', express.static(path.join(__dirname, '..')));


app.use(express.json());

// Recibe la offer del navegador y la reenvía al servidor de juegos
app.post('/api/webrtc/offer', async (req, res) => {
  const offer = req.body;

  console.log("📤 Reenviando offer al servidor de juegos...");

  const resp = await fetch('http://localhost:8000/offer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offer)
  });

  const answer = await resp.json();

  console.log("📥 Answer recibida desde el servidor de juegos");

  res.json(answer);
});


app.post('/api/webrtc/candidate', (req, res) => {
  console.log("📨 Candidate recibido del navegador");
  // De momento no hacemos nada con él
  res.sendStatus(200);
});


app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor web en http://192.168.1.175:3000');
});

