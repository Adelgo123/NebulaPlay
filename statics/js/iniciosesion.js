document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // POPUP (tu código original)
    // -------------------------

    const userIcon = document.getElementById("icono-usuario");
    const loginPopup = document.getElementById("login-popup");

    if (!userIcon) {
        console.error("No se encontró el icono de usuario");
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
    // LOGIN (nuevo, limpio)
    // -------------------------

    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const datos = {
                email: loginForm.email.value,
                password: loginForm.password.value
            };

            try {
                const respuesta = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok && resultado.userId) {
                    alert("Inicio de sesión correcto");

                    localStorage.setItem("userId", resultado.userId);
                    localStorage.setItem("avatar", resultado.avatar);

                    window.location.href = "/panelusuario/index.html";
                } else {
                    alert(resultado.error || "Credenciales incorrectas");
                }

            } catch (err) {
                console.error(err);
                alert("Error de conexión con el servidor");
            }
        });
    }

});
