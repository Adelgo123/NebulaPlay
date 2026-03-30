// webrtc-client.js

let pc = null;
let started = false;

async function startGame() {
    if (started) {
        console.warn("⚠️ Ya hay una sesión iniciada");
        return;
    }
    started = true;

    console.log("🎮 Iniciando conexión WebRTC...");

    pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // ===============================
    // 🎮 DATA CHANNEL
    // ===============================
    const channel = pc.createDataChannel('game');

    channel.onopen = () => console.log("🟢 Canal de datos abierto");
    channel.onmessage = e => console.log("Servidor dice:", e.data);

    // ===============================
    // 🎥 VIDEO
    // ===============================
    pc.ontrack = e => {
        console.log("🎥 Track recibido");

        const video = document.getElementById("gameVideo");
        video.srcObject = e.streams[0];

        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;

        video.play().catch(err => console.log("Error reproduciendo video:", err));
    };

    // ===============================
    // ❄️ ICE CANDIDATES
    // ===============================
    pc.onicecandidate = e => {
        if (e.candidate) {
            fetch("http://localhost:3000/api/webrtc/candidate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e.candidate)
            }).catch(err => console.error("Error enviando candidate:", err));
        }
    };

    try {
        // ===============================
        // 📤 OFFER
        // ===============================
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const res = await fetch("http://localhost:3000/api/webrtc/offer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(offer)
        });

        const answer = await res.json();

        // ===============================
        // 📥 ANSWER
        // ===============================
        await pc.setRemoteDescription(answer);

        console.log("🟢 Conexión WebRTC establecida");

    } catch (err) {
        console.error("❌ Error en WebRTC:", err);
    }
}

// ===============================
// ▶️ BOTÓN
// ===============================
document
    .querySelector('#jugar-ahora')
    .addEventListener('click', startGame);