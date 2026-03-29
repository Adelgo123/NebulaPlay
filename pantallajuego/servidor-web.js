// servidor-web.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// Recibe la offer del navegador y la reenvía al servidor de juegos
app.post('/api/webrtc/offer', async (req, res) => {
  const offer = req.body;

  console.log("📤 Reenviando offer al servidor de juegos...");

  const resp = await fetch('http://192.168.1.173:4000/webrtc/offer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offer)
  });

  const answer = await resp.json();

  console.log("📥 Answer recibida desde el servidor de juegos");

  res.json(answer);
});

app.listen(3000, () => console.log('Servidor web en http://192.168.1.175:3000'));
