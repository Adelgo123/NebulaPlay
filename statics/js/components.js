class MainNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header-guest">
        <nav class="nav nav-guest">
            <a class="nav-links" id="inicio" href="../../index.html">NebulaPlay</a>
            <input type="text" class="search-input" id="search" placeholder="Buscar juego...">
            <div id="results"></div>
            <button type="button" class="menu-btn guest-menu-btn">☰</button>
                
            <div class="menu-links guest-menu-links">
                <div class="dropdown">
                    <button type="button" class="dropbtn nav-links">EXPLORAR ▼</button>
                        <div class="dropdown-content">
                        <a href="#">Nuevos lanzamientos</a>
                        <a href="#">Próximos lanzamientos</a>
                        <a href="#">Demos</a>
                </div>

                <div class="dropdown">
                    <button type="button" class="dropbtn nav-links">RECOMENDACIONES ▼</button>
                        <div class="dropdown-content">
                        <a href="#">Lo más jugado</a>
                        <a href="#">Lista de novedades</a>
                        <a href="#">Popular entre la comunidad</a>
                </div>

                <div class="dropdown">
                    <button type="button" class="dropbtn nav-links">MÁS ▼</button>
                        <div class="dropdown-content">
                        <a href="#">Categorías</a>
                        <a href="#">Formas de jugar</a>
                        <a href="#">Amistades</a>
                </div>
            </div>

            <a class="nav-links" href="#">CONTACTO</a>
            <a class="nav-links" href="#" id="icono-usuario"><img src="/img/User.png" alt="usuario"></a>
            <a class="nav-links" href="#"><img src="/img/language.png" alt="lenguaje"></a>
            </div>
            </nav>

            <nav class="subnav subnav-guest">
            <div class="dropdown">
                <button type="button" class="dropbtn">Explorar ▼</button>
                <div class="dropdown-content">
                <a href="#">Nuevos lanzamientos</a>
                <a href="#">Próximos lanzamientos</a>
                <a href="#">Demos</a>
                </div>
            </div>

            <div class="dropdown">
                <button type="button" class="dropbtn">Recomendaciones ▼</button>
                <div class="dropdown-content">
                <a href="#">Lo más jugado</a>
                <a href="#">Lista de novedades</a>
                <a href="#">Popular entre la comunidad</a>
                </div>
            </div>

            <div class="dropdown">
                <button type="button" class="dropbtn">Más ▼</button>
                <div class="dropdown-content">
                <a href="#">Categorías</a>
                <a href="#">Formas de jugar</a>
                <a href="#">Amistades</a>
                </div>
            </div>
        </nav>
      </header>
    `;
  }
}
customElements.define("main-nav", MainNav);


class LoginNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header-login">
        <nav class="nav nav-login">
        <a class="nav-links" id="inicio" href="../../panelusuario/panelusuario.html">NebulaPlay</a>
        <input type="text" class="search-input" id="search" placeholder="Buscar juego...">
        <div id="results"></div>
          <button type="button" class="menu-btn login-menu-btn">☰</button>

          <div class="menu-links login-menu-links">
            <a class="nav-links" href="#">MIS AMIGOS</a>
            <a class="nav-links" href="#">BIBLIOTECA</a>
            <a class="nav-links" href="#">NOTICIAS</a>
            <a class="nav-links" href="#">NOTIFICACIONES</a>

            <div class="dropdown">
              <button class="nav-links dropbtn">MI PERFIL ▼</button>
                <div class="dropdown-content">
                    <a href="#">Ver mi perfil</a>
                    <a href="#">Detalles de la cuenta</a>
                    <a href="#">Ver mi suscripción</a>
                    <a href="#">Cambiar de cuenta...</a>
                    <a href="#" id="logoutBtn">Cerrar sesión...</a>
                </div>
            </div>
          </div>
        </nav>

        <nav class="subnav subnav-login">
          <div class="dropdown">
            <button type="button" class="dropbtn">Explorar ▼</button>
            <div class="dropdown-content">
              <a href="#">Nuevos lanzamientos</a>
              <a href="#">Próximos lanzamientos</a>
              <a href="#">Demos</a>
            </div>
          </div>

          <div class="dropdown">
            <button type="button" class="dropbtn">Recomendaciones ▼</button>
            <div class="dropdown-content">
              <a href="#">Lo más jugado</a>
              <a href="#">Lista de novedades</a>
              <a href="#">Popular entre tus amigos</a>
            </div>
          </div>

          <div class="dropdown">
            <button type="button" class="dropbtn">Más ▼</button>
            <div class="dropdown-content">
              <a href="#">Categorías</a>
              <a href="#">Formas de jugar</a>
              <a href="#">Amistades</a>
            </div>
          </div>
          <button type="button" class="pending-btn">Pendientes de jugar</button>
        </nav>
      </header>
    `;
  }
}
customElements.define("login-nav", LoginNav);


class MainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <a href="">Política de privacidad</a>
        <a href="">Sus opciones de privacidad</a>
        <a href="">Términos de servicio</a>
        <a href="">Accesibilidad</a>
        <a href="">Políticas de empresa</a>
        <a href="">Seguridad de productos</a>
        <a href="" id="contactar">Contactar</a>
    </footer>
    `;
  }
}
customElements.define("main-footer", MainFooter);


class LoginPopup extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="login-popup" class="login-hidden">
    <div class="login-form">
        <h2>Iniciar sesión</h2>
        <form method="POST" id="login-form">
            <input type="email" name="email" placeholder="Escribe tu correo" minlength="6" required>
            <input type="password" name="password" id="" placeholder="Escribe tu contraseña" maxlength="20" minlength="6" required>
            <button type="submit">Iniciar sesión</button>
            <a href="../index.html">He olvidado mi contraseña</a>
            <a href="./registro/registro.html">Aún no tengo una cuenta</a>
        </form>
    </div>
    `;
  }
}
customElements.define("login-popup", LoginPopup);

class MainSuscripciones extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="suscripcion" id="suscripciones">
            <div class="select_sus">
                <h3>Básico</h3>
                <h2>45,99€/12 meses</h2>
                <ul>
                    <li>Accede a más de 2000+ juegos</li>
                    <li>Juegos Ready-to-Play</li>
                    <li>Sesiones de juego de 1 horas*</li>
                    <li>Resolución de hasta 1080p</li>
                    <li>Hasta 60 FPS</li>
                    <li>Sin acceso prioritario a la cola</li>
                    <li>Espera típicamente de >2 minutos*</li>
                </ul>
                <a href="./registro/registro.html">Conecta y juega</a>
            </div>
            <div class="select_sus">
                <h3>Estándar</h3>
                <h2>109,99€/12 meses</h2>
                <ul>
                    <li>Accede a más de 4000+ juegos</li>
                    <li>Juegos Ready-to-Play</li>
                    <li>Juegos Install-to-Play Nuevo!</li>
                    <li>Sesiones de juego de 6 horas*</li>
                    <li>Resolución de hasta 1440p</li>
                    <li>Acceso prioritario a la cola</li>
                    <li>Espera típicamente de -1 minutos*</li>
                </ul>
                <a href="./registro/registro.html">Juega + preocúpate -</a>
            </div>
            <div class="select_sus">
                <h3>PREMIUM</h3>
                <h2>219,99€/12 meses</h2>
                <ul>
                    <li>Accede a más de 4000+ juegos</li>
                    <li>Juegos Install-to-Play Nuevo!</li>
                    <li>Sesiones de juego de 8 horas*</li>
                    <li>Resolución de hasta 4K</li>
                    <li>Hasta 240 FPS</li>
                    <li>Acceso ultraprioritario a la cola</li>
                    <li>Típicamente sin espera*</li>
                </ul>
                <a href="./registro/registro.html">Juega al máximo</a>
            </div>
        </section>
    `;
  }
}
customElements.define("main-suscripciones", MainSuscripciones);