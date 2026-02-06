fetch("juegos.json")
  .then(response => response.json())
  .then(juegos => {
    const contenedor = document.getElementById("lista-juegos");

    juegos.forEach(juego => {
      const div = document.createElement("div");
      div.classList.add("juego");

      div.innerHTML = `
        <img src="${juego.imagen}" alt="${juego.titulo}">
        <h3>${juego.titulo}</h3>
      `;

      // Al hacer clic, ir a la página del juego
      div.addEventListener("click", () => {
        window.location.href = `../paneljuego/index.html?id=${juego.id}`;
      });

      contenedor.appendChild(div);
    });
  });

  fetch("juegos.json")
  .then(response => response.json())
  .then(juegos => {
    const contenedor = document.getElementById("lista-juegos2");

    juegos.forEach(juego => {
      const div = document.createElement("div");
      div.classList.add("juego");

      div.innerHTML = `
        <img src="${juego.imagen}" alt="${juego.titulo}">
        <h3>${juego.titulo}</h3>
      `;

      // Al hacer clic, ir a la página del juego
      div.addEventListener("click", () => {
        window.location.href = `../paneljuego/index.html?id=${juego.id}`;
      });

      contenedor.appendChild(div);
    });
  });

    fetch("juegos.json")
  .then(response => response.json())
  .then(juegos => {
    const contenedor = document.getElementById("lista-juegos3");

    juegos.forEach(juego => {
      const div = document.createElement("div");
      div.classList.add("juego");

      div.innerHTML = `
        <img src="${juego.imagen}" alt="${juego.titulo}">
        <h3>${juego.titulo}</h3>
      `;

      // Al hacer clic, ir a la página del juego
      div.addEventListener("click", () => {
        window.location.href = `../paneljuego/index.html?id=${juego.id}`;
      });

      contenedor.appendChild(div);
    });
  });
