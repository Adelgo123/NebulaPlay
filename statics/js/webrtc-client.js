// webrtc-client-binary.js – Cloud Gaming ultra low latency + Cursor Overlay

let pc = null;
let channel = null;
let started = false;

// Mapa de teclas → código virtual en Windows
const keyMap = {
    "KeyW": 0x57, "KeyA": 0x41, "KeyS": 0x53, "KeyD": 0x44,
    "Space": 0x20, "ArrowUp": 0x26, "ArrowDown": 0x28,
    "ArrowLeft": 0x25, "ArrowRight": 0x27,
    "Digit1": 0x31, "Digit2": 0x32, "Digit3": 0x33, "Digit4": 0x34
};

// ===============================
// CURSOR OVERLAY
// ===============================
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

function updateCursor(dx, dy) {
    cursorX += dx;
    cursorY += dy;

    cursorX = Math.max(0, Math.min(window.innerWidth, cursorX));
    cursorY = Math.max(0, Math.min(window.innerHeight, cursorY));

    const cursor = document.getElementById("cursor-overlay");
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
}

// ===============================
// START GAME
// ===============================
async function startGame() {
    if (started) return;
    started = true;

    pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    const videoEl = document.getElementById("gameVideo");
    const remoteStream = new MediaStream();
    videoEl.srcObject = remoteStream;
    videoEl.autoplay = true;
    videoEl.muted = true;
    videoEl.playsInline = true;

    pc.ontrack = e => remoteStream.addTrack(e.track);

    // DATA CHANNEL LOW LATENCY
    channel = pc.createDataChannel('game', { ordered: false, maxRetransmits: 0 });
    channel.onopen = () => {
        console.log("DataChannel abierto");
        setupInput(videoEl);
    };
    channel.onclose = () => console.log("DataChannel cerrado");

    pc.onicecandidate = e => {
        if (e.candidate) {
            fetch("http://localhost:8000/candidate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e.candidate)
            });
        }
    };

    const offer = await pc.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: false });
    await pc.setLocalDescription(offer);

    const res = await fetch("http://localhost:8000/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer)
    });

    const answer = await res.json();
    await pc.setRemoteDescription(answer);
}

// ===============================
// INPUT SYSTEM BINARIO + CURSOR OVERLAY
// ===============================
function setupInput(videoEl) {

    const cursor = document.getElementById("cursor-overlay");

    // Pointer lock al hacer click en el vídeo
    videoEl.addEventListener("click", async () => {
        if (document.pointerLockElement !== videoEl) {
            await videoEl.requestPointerLock();
        }
        cursor.style.display = "block";
        videoEl.focus();
    });

    document.addEventListener("pointerlockchange", () => {
        if (document.pointerLockElement !== videoEl) {
            cursor.style.display = "none";
        }
    });

    function safeSend(buf) {
        if (!channel || channel.readyState !== "open") return;
        channel.send(buf);
    }

    // KEYBOARD: type 0 = keydown, 1 = keyup
    function sendKey(code, type) {
        const vk = keyMap[code];
        if (!vk) return;
        const buffer = new ArrayBuffer(3);
        const view = new DataView(buffer);
        view.setUint8(0, type);
        view.setUint16(1, vk, true);
        safeSend(buffer);
    }

    // MOUSEMOVE: type 2
    function sendMouse(dx, dy) {
        const buffer = new ArrayBuffer(5);
        const view = new DataView(buffer);
        view.setUint8(0, 2);
        view.setInt16(1, dx, true);
        view.setInt16(3, dy, true);
        safeSend(buffer);
    }

    // MOUSE BUTTON: type 3
    function sendMouseButton(btn, down) {
        const buffer = new ArrayBuffer(3);
        const view = new DataView(buffer);
        view.setUint8(0, 3);
        view.setUint8(1, btn);
        view.setUint8(2, down ? 1 : 0);
        safeSend(buffer);
    }

    // RESET: type 4
    function sendReset() {
        const buffer = new ArrayBuffer(1);
        new DataView(buffer).setUint8(0, 4);
        safeSend(buffer);
    }

    // Eventos
    document.addEventListener("keydown", e => {
        if (e.repeat) return;
        sendKey(e.code, 0);
    });

    document.addEventListener("keyup", e => {
        sendKey(e.code, 1);
    });

    document.addEventListener("mousemove", e => {
        if (document.pointerLockElement !== videoEl) return;

        // enviar al backend
        sendMouse(e.movementX, e.movementY);

        // mover cursor overlay
        updateCursor(e.movementX, e.movementY);
    });

    document.addEventListener("mousedown", e => {
        if (document.pointerLockElement !== videoEl) return;
        sendMouseButton(e.button, true);
    });

    document.addEventListener("mouseup", e => {
        if (document.pointerLockElement !== videoEl) return;
        sendMouseButton(e.button, false);
    });

    window.addEventListener("blur", () => {
        sendReset();
    });
}

document.querySelector('#jugar-ahora').addEventListener('click', startGame);
