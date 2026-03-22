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

//Submenu
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropbtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            document.querySelectorAll('.dropbtn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const menu = btn.nextElementSibling;
            const isOpen = menu.style.display === 'block';

            document.querySelectorAll('.dropdown-content').forEach(m => m.style.display = 'none');

            if (!isOpen) menu.style.display = 'block';
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(m => m.style.display = 'none');
            document.querySelectorAll('.dropbtn').forEach(b => b.classList.remove('active'));
        }
    });
});

