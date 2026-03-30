// webrtc-client.js - Cliente WebRTC para NebulaPlay
// ================================================

const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// -----------------------------
// 1. Canal de datos (game)
const channel = pc.createDataChannel('game');
channel.onopen = () => {
    console.log("🟢 Canal de datos abierto");
    channel.send("Hola servidor de juegos");
};
channel.onmessage = e => console.log("Servidor de juegos dice:", e.data);

// -----------------------------
// 2. Recibir vídeo desde el servidor
pc.ontrack = e => {
    console.log("🎥 Track recibido:", e.streams);
    const video = document.getElementById("gameVideo");
    if (video) video.srcObject = e.streams[0];
};

// -----------------------------
// 3. Enviar ICE candidates al servidor web
pc.onicecandidate = e => {
    if (e.candidate) {
        fetch('http://localhost:3000/api/webrtc/candidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(e.candidate)
        });
    }
};

// -----------------------------
// 4. Iniciar juego (offer → answer)
async function startGame() {
    console.log("🎮 Iniciando conexión WebRTC...");

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const res = await fetch("http://localhost:3000/api/webrtc/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer)
    });

    const answer = await res.json();
    await pc.setRemoteDescription(answer);

    console.log("🟢 Conexión WebRTC establecida");
}

async function pollServerICE() {
    const res = await fetch("http://192.168.1.173:8000/ice");
    const candidates = await res.json();

    for (const c of candidates) {
        await pc.addIceCandidate(c);
    }

    setTimeout(pollServerICE, 500);
}

pollServerICE();


// -----------------------------
// 5. Botón "Jugar Ahora"
document.querySelector('#jugar-ahora').addEventListener('click', startGame);
