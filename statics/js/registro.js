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

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/auth/register.js", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password, avatar: avatarState })
});

  const data = await response.json();

  if (response.ok) {
    alert("Usuario creado correctamente 👽");
  } else {
    alert(data.error);
  }
});

//Menu de secciones

const section = document.querySelectorAll('items_selector');

section.forEach(section => {
  section.addEventListener("click", () => {

    // quitar active a todas
    section.forEach(s => s.classList.remove("active"));

    // activar la clicada
    section.classList.add("active");

    console.log("active:", section.dataset.section);
  });
});
