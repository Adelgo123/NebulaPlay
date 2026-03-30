// ===============================
// WebRTC CLIENTE PARA NEBULAPLAY
// ===============================

// 1. Crear PeerConnection
const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// 2. Canal de datos (opcional)
const channel = pc.createDataChannel('game');
channel.onopen = () => channel.send('Hola servidor de juegos');
channel.onmessage = e => console.log('Servidor de juegos dice:', e.data);

// 3. Recibir vídeo desde Pion
pc.ontrack = e => {
    console.log("🎥 Stream recibido del servidor");
    document.querySelector('#stream').srcObject = e.streams[0];
};

// 4. Enviar ICE candidates al servidor web
pc.onicecandidate = e => {
    if (e.candidate) {
        fetch('/api/webrtc/candidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(e.candidate)
        });
    }
};

// 5. Iniciar el juego (crear offer → enviar → recibir answer)
async function startGame() {
    console.log("🎮 Iniciando conexión WebRTC...");

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const res = await fetch("/api/webrtc/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer)
    });

    const answer = await res.json();
    await pc.setRemoteDescription(answer);

    console.log("🟢 Conexión WebRTC establecida");
}

// 6. Botón
document.querySelector('#jugar-ahora').addEventListener('click', startGame);
