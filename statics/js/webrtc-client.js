// webrtc-client.js – versión Cloud Gaming 60fps

let pc = null;
let started = false;

// Función principal
async function startGame() {
    if (started) {
        console.warn("⚠️ Ya hay una sesión iniciada");
        return;
    }
    started = true;

    console.log("🎮 Iniciando conexión WebRTC...");

    // ===============================
    // 🔹 PeerConnection
    // ===============================
    pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // ===============================
    // 🔹 DataChannel
    // ===============================
    const channel = pc.createDataChannel('game');
    channel.onopen = () => console.log("🟢 Canal de datos abierto");
    channel.onmessage = e => console.log("📨 Servidor dice:", e.data);

    // ===============================
    // 🔹 Video remoto
    // ===============================
    const remoteStream = new MediaStream();
    const videoEl = document.getElementById("gameVideo");
    videoEl.srcObject = remoteStream;
    videoEl.autoplay = true;
    videoEl.muted = true;
    videoEl.playsInline = true;

    // Cada track remoto se agrega al MediaStream
    pc.ontrack = e => {
        console.log("🎥 Track remoto recibido:", e.track.kind);
        remoteStream.addTrack(e.track);
    };

    // ===============================
    // 🔹 ICE Candidates
    // ===============================
    pc.onicecandidate = e => {
        if (e.candidate) {
            fetch("http://localhost:3000/api/webrtc/candidate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e.candidate)
            }).catch(err => console.error("❌ Error enviando candidate:", err));
        }
    };

    try {
        // ===============================
        // 🔹 Crear Offer
        // ===============================
        const offer = await pc.createOffer({
            offerToReceiveVideo: true, // importante para recibir video
            offerToReceiveAudio: false
        });
        await pc.setLocalDescription(offer);

        // ===============================
        // 🔹 Enviar Offer al servidor
        // ===============================
        const res = await fetch("http://localhost:3000/api/webrtc/offer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(offer)
        });

        const answer = await res.json();

        // ===============================
        // 🔹 Set Remote Description
        // ===============================
        await pc.setRemoteDescription(answer);

        console.log("🟢 Conexión WebRTC establecida");

        // ===============================
        // 🔹 Solicitar Keyframes periódicamente (para Cloud Gaming)
        // ===============================
        setInterval(() => {
            pc.getSenders().forEach(sender => {
                if (sender.track && sender.track.kind === 'video') {
                    // Solicitar un PLI al servidor si el track lo permite
                    if (sender.replaceTrack) sender.replaceTrack(sender.track);
                }
            });
        }, 2000); // cada 2s

    } catch (err) {
        console.error("❌ Error en WebRTC:", err);
    }
}

// ===============================
// ▶️ BOTÓN Jugar
// ===============================
document
    .querySelector('#jugar-ahora')
    .addEventListener('click', startGame);