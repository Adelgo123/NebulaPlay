document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const menuLinks = document.getElementById("menu-links");

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