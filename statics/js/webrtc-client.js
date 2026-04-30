// webrtc-client-binary.js – OPTIMIZED LOW LATENCY VERSION

let pc = null;
let channel = null;
let started = false;
let videoEl = null;

const SIGNALING_BASE_URL = `${window.location.origin}/api/webrtc`;

// ===============================
// START GAME
// ===============================
async function startGame() {
    if (started) return;
    started = true;

    console.log("🎮 startGame()");

    pc = new RTCPeerConnection({
        // 🚀 mejora arranque ICE (clave para latency)
        iceCandidatePoolSize: 10,

        // 🟢 en Tailscale normalmente basta con esto
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]
    });

    videoEl = document.getElementById("gameVideo");

    const remoteStream = new MediaStream();
    videoEl.srcObject = remoteStream;
    videoEl.autoplay = true;
    videoEl.muted = true;
    videoEl.playsInline = true;

    pc.ontrack = e => remoteStream.addTrack(e.track);

    // ===============================
    // DATA CHANNEL (FAST PATH)
    // ===============================
    channel = pc.createDataChannel("game", {
        ordered: false,
        maxRetransmits: 0
    });

    channel.binaryType = "arraybuffer";

    channel.onopen = () => {
        console.log("✅ DataChannel OPEN");
        setupInput(videoEl);
    };

    channel.onclose = () => console.log("❌ DataChannel closed");

    // ===============================
    // ICE DEBUG (LIGHTWEIGHT)
    // ===============================
    pc.oniceconnectionstatechange = () => {
        console.log("ICE:", pc.iceConnectionState);
    };

    // ===============================
    // OFFER FLOW (OPTIMIZED)
    // ===============================
    const offer = await pc.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: false
    });

    await pc.setLocalDescription(offer);

    // 🚀 no extra ICE waiting → faster connect
    const res = await fetch(`${SIGNALING_BASE_URL}/offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pc.localDescription)
    });

    const answer = await res.json();
    await pc.setRemoteDescription(answer);
}

// ===============================
// INPUT SYSTEM (UNCHANGED)
// ===============================
function setupInput(videoEl) {

    const cursor = document.getElementById("cursor-overlay");

    videoEl.addEventListener("click", async () => {
        if (document.pointerLockElement !== videoEl) {
            await videoEl.requestPointerLock();
        }
        if (cursor) cursor.style.display = "block";
    });

    function safeSend(buf) {
        if (!channel || channel.readyState !== "open") return;
        channel.send(buf);
    }

    function sendKey(code, type) {
        const keyMap = {
            "KeyW": 0x57, "KeyA": 0x41, "KeyS": 0x53, "KeyD": 0x44,
            "Space": 0x20, "ArrowUp": 0x26, "ArrowDown": 0x28,
            "ArrowLeft": 0x25, "ArrowRight": 0x27,
            "Digit1": 0x31, "Digit2": 0x32, "Digit3": 0x33, "Digit4": 0x34
        };

        const vk = keyMap[code];
        if (!vk) return;

        const buffer = new ArrayBuffer(3);
        const view = new DataView(buffer);
        view.setUint8(0, type);
        view.setUint16(1, vk, true);

        safeSend(buffer);
    }

    function sendMouse(dx, dy) {
        const buffer = new ArrayBuffer(5);
        const view = new DataView(buffer);

        view.setUint8(0, 2);
        view.setInt16(1, dx, true);
        view.setInt16(3, dy, true);

        safeSend(buffer);
    }

    function sendMouseButton(btn, down) {
        const buffer = new ArrayBuffer(3);
        const view = new DataView(buffer);

        view.setUint8(0, 3);
        view.setUint8(1, btn);
        view.setUint8(2, down ? 1 : 0);

        safeSend(buffer);
    }

    // ===============================
    // INPUT EVENTS (UNCHANGED)
    // ===============================
    document.addEventListener("mousemove", e => {
        if (document.pointerLockElement !== videoEl) return;
        sendMouse(e.movementX, e.movementY);
    });

    document.addEventListener("keydown", e => {
        if (e.repeat) return;
        sendKey(e.code, 0);
    });

    document.addEventListener("keyup", e => {
        sendKey(e.code, 1);
    });

    document.addEventListener("mousedown", e => {
        if (document.pointerLockElement !== videoEl) return;
        sendMouseButton(e.button, true);
    });

    document.addEventListener("mouseup", e => {
        if (document.pointerLockElement !== videoEl) return;
        sendMouseButton(e.button, false);
    });
}

// ===============================
document.querySelector("#jugar-ahora").addEventListener("click", startGame);

