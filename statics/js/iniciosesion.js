document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // POPUP
    // -------------------------

    const userIcon = document.getElementById("icono-usuario");
    const loginPopup = document.getElementById("login-popup");

    if (!userIcon || !loginPopup) {
        console.error("No se encontró el icono de usuario o el popup");
        return;
    }

    // Mostrar popup si viene ?login=1
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "1") {
        loginPopup.classList.remove("login-hidden");
    }

    userIcon.addEventListener("click", (e) => {
        e.preventDefault();
        loginPopup.classList.toggle("login-hidden");
    });

    loginPopup.addEventListener("click", (e) => {
        if (e.target === loginPopup) {
            loginPopup.classList.add("login-hidden");
        }
    });

    // -------------------------
    // LOGIN
    // -------------------------

    const loginForm = document.getElementById("login-form");

    if (!loginForm) {
        console.error("No se encontró el formulario de login");
        return;
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[name="email"]').value.trim();
        const password = loginForm.querySelector('input[name="password"]').value.trim();

        if (!email || !password) {
            alert("Por favor, completa todos los campos");
            return;
        }

        const datos = { email, password };

        try {
            const respuesta = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok && resultado.token) {
                alert("Inicio de sesión correcto");

                localStorage.setItem("userId", resultado.userId);
                localStorage.setItem("token", resultado.token);


                window.location.href = "./panelusuario/panelusuario.html";
            } else {
                alert(resultado.error || "Credenciales incorrectas");
            }

        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor");
        }
    });

    // -------------------------
// LOGOUT
// -------------------------
  const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Eliminar token
            localStorage.removeItem("token");

            // Si guardas más datos, límpialos también
            localStorage.removeItem("userId");

            // Redirigir al inicio
            window.location.href = "../../index.html";
        });
    }

});
