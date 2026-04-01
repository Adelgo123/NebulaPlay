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
