// ===============================
// game.js – Inputs completos
// ===============================

// DataChannel para enviar inputs (requiere que 'pc' ya exista)
/*const dc = pc.createDataChannel("inputs");

dc.onopen = () => {
  console.log("🟢 DataChannel abierto (inputs)");
};

dc.onclose = () => {
  console.log("🔴 DataChannel cerrado (inputs)");
};

// ===============================
// TECLADO
// ===============================
document.addEventListener("keydown", (e) => {
  if (dc.readyState !== "open") return;

  // Evitar repetir eventos si se mantiene la tecla
  if (e.repeat) return;

  dc.send(JSON.stringify({
    type: "keydown",
    key: e.code
  }));
});

document.addEventListener("keyup", (e) => {
  if (dc.readyState !== "open") return;

  dc.send(JSON.stringify({
    type: "keyup",
    key: e.code
  }));
});

// ===============================
// RATÓN – MOVIMIENTO
// ===============================
const video = document.querySelector("video");

document.addEventListener("mousemove", (e) => {
  if (dc.readyState !== "open") return;

  // Solo enviar movimientos si el pointer está bloqueado en el video
  if (document.pointerLockElement === video) {
    dc.send(JSON.stringify({
      type: "mousemove",
      dx: e.movementX,
      dy: e.movementY
    }));
  }
});

// ===============================
// RATÓN – CLICKS
// ===============================
document.addEventListener("mousedown", (e) => {
  if (dc.readyState !== "open") return;

  // Solo clicks dentro del video con pointer lock
  if (document.pointerLockElement === video) {
    dc.send(JSON.stringify({
      type: "mousedown",
      button: e.button
    }));
  }
});

document.addEventListener("mouseup", (e) => {
  if (dc.readyState !== "open") return;

  if (document.pointerLockElement === video) {
    dc.send(JSON.stringify({
      type: "mouseup",
      button: e.button
    }));
  }
});

// Evitar menú contextual
document.addEventListener("contextmenu", (e) => e.preventDefault());

// ===============================
// POINTER LOCK (modo FPS)
// ===============================
if (video) {
  video.addEventListener("click", () => {
    video.requestPointerLock();
  });
}

// ===============================
// BOTONES DE UI (opcionales)
// ===============================
// Si tienes botones fuera del video que deben enviar clicks al juego:
document.querySelectorAll(".ui-button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (dc.readyState !== "open") return;

    // Simula click izquierdo
    dc.send(JSON.stringify({ type: "mousedown", button: 0 }));
    dc.send(JSON.stringify({ type: "mouseup", button: 0 }));
  });
});

// ===============================
// DEBUG
// ===============================
console.log("🎮 Input system cargado");