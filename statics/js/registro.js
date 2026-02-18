// Estado del avatar
const avatarState = {
  skin: "green_01",
  eyes: "eyes_02",
  eyeColor: "purple",
  mouth: "mouth_01",
  hair: "hair_03",
  hairColor: "black",
  accessories: []
};

document.addEventListener("DOMContentLoaded", () => {

  // ---------- REGISTRO ----------
  const form = document.getElementById("registerForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, avatar: avatarState })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Usuario creado correctamente 👽");
        } else {
          alert(data.error || "Error al registrar");
        }
      } catch (err) {
        console.error(err);
        alert("No se pudo conectar con el servidor");
      }
    });
  }

  // ---------- ELEMENTOS DEL AVATAR ----------
  const avatarPiel = document.getElementById("avatar-piel");
  const avatarOjos = document.getElementById("avatar-ojos");
  const itemsContainer = document.getElementById("items-container");

  const basePathPiel = "../registro/img/Personalizar Alien/Pieles y Tonos";
  // OJOS: misma carpeta que en tu HTML
  // <img src="/registro/img/Personalizar Alien/Ojos y Tonos/Ojos1/ojos1.png">
  const basePathOjos = "/registro/img/Personalizar Alien/Ojos y Tonos/Ojos1";

  let pielActual = 1;

  // ---------- MENÚ DE SECCIONES ----------
  const menuSections = document.querySelectorAll(".menu-section");

  menuSections.forEach((item) => {
    item.addEventListener("click", () => {
      menuSections.forEach((s) => s.classList.remove("active"));
      item.classList.add("active");

      const section = item.dataset.section;

      if (section === "piel") mostrarBotonesPiel();
      if (section === "ojos") mostrarBotonesOjos();
    });
  });

  // ---------- BOTONES DE PIEL ----------
  function mostrarBotonesPiel() {
    itemsContainer.innerHTML = `
      <button class="piel1"><img src="/registro/img/Personalizar Alien/Pieles y Tonos/Piel1/tono1.png"></button>
      <button class="piel2"><img src="/registro/img/Personalizar Alien/Pieles y Tonos/Piel2/tono1.png"></button>
      <button class="piel3"><img src="/registro/img/Personalizar Alien/Pieles y Tonos/Piel3/tono1.png"></button>
    `;

    document.querySelector(".piel1").addEventListener("click", () => {
      pielActual = 1;
      avatarPiel.src = `${basePathPiel}/Piel1/tono1.png`;
    });

    document.querySelector(".piel2").addEventListener("click", () => {
      pielActual = 2;
      avatarPiel.src = `${basePathPiel}/Piel2/tono1.png`;
    });

    document.querySelector(".piel3").addEventListener("click", () => {
      pielActual = 3;
      avatarPiel.src = `${basePathPiel}/Piel3/tono1.png`;
    });
  }

  // ---------- BOTONES DE OJOS ----------
  function mostrarBotonesOjos() {
    itemsContainer.innerHTML = ""; // limpiar

    const ojosDisponibles = [1];

    ojosDisponibles.forEach(num => {
      const btn = document.createElement("button");
      btn.classList.add("btn-ojos");

      // Ojos1/ojos1.png, Ojos1/ojos2.png, etc.
      btn.innerHTML = `
        <img src="${basePathOjos}/ojos${num}.png">
      `;

      btn.addEventListener("click", () => {
        avatarOjos.src = `${basePathOjos}/ojos${num}.png`;
      });

      itemsContainer.appendChild(btn);
    });
  }

  // ---------- TONOS DE PIEL (BOTONES ABAJO) ----------
  const tonos = document.querySelectorAll(".selectores button");

  tonos.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const tono = index + 1;
      avatarPiel.src = `${basePathPiel}/Piel${pielActual}/tono${tono}.png`;
    });
  });

  // Mostrar piel por defecto al cargar
  mostrarBotonesPiel();
});


// ---------- ANIMACIÓN DE TEXTO (MÁQUINA DE ESCRIBIR) ----------
const textoBienvenida = document.getElementById("texto-bienvenida");
const mensaje = "¡Buenas creador! Estás a punto de darme vida... Empieza por darme un nombre con el que identificarme.";

let i = 0;

function escribirTexto() {
  if (i < mensaje.length) {
    textoBienvenida.textContent += mensaje.charAt(i);
    i++;
    setTimeout(escribirTexto, 40); // velocidad de escritura
  }
}

escribirTexto();
