document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // MENÚ HAMBURGUESA (guest + login)
    // ============================
    document.querySelectorAll(".nav").forEach(nav => {
        const menuBtn = nav.querySelector(".menu-btn");
        const menuLinks = nav.querySelector(".menu-links");

        if (!menuBtn || !menuLinks) return;

        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            menuLinks.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!menuLinks.contains(e.target) && e.target !== menuBtn) {
                menuLinks.classList.remove("active");
            }
        });
    });


    // ============================
    // DROPDOWNS (guest + login + MI PERFIL)
    // ============================
    document.querySelectorAll(".dropdown").forEach(drop => {
        const btn = drop.querySelector(".dropbtn");
        const menu = drop.querySelector(".dropdown-content");

        if (!btn || !menu) return;

        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            // Cerrar todos los demás
            document.querySelectorAll(".dropdown-content").forEach(m => m.style.display = "none");
            document.querySelectorAll(".dropbtn").forEach(b => b.classList.remove("active"));

            // Abrir este
            const isOpen = menu.style.display === "block";

            if (!isOpen) {
                btn.classList.add("active");
                menu.style.display = "block";
            }
        });
    });

    // Cerrar dropdowns al hacer click fuera
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown-content").forEach(m => m.style.display = "none");
        document.querySelectorAll(".dropbtn").forEach(b => b.classList.remove("active"));
    });

});

const input = document.getElementById("search");
const resultsDiv = document.getElementById("results");

input.addEventListener("input", async () => {
  const query = input.value.trim();

  if (query.length < 2) {
    resultsDiv.innerHTML = "";
    resultsDiv.style.display = "none";
    return;
  }

  const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  if (!data || data.length === 0) {
    resultsDiv.innerHTML = "";
    resultsDiv.style.display = "none";
    return;
  }

  resultsDiv.innerHTML = data
    .map(
      game => `
        <div class="result-item">
          ${game.nombre}
        </div>
      `
    )
    .join("");

  resultsDiv.style.display = "block";

  // Cerrar resultados al hacer click en un item
  document.querySelectorAll(".result-item").forEach(item => {
    item.addEventListener("click", () => {
      input.value = item.textContent.trim();
      resultsDiv.style.display = "none";
    });
  });
});
