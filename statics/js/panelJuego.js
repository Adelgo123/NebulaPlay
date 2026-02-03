document.addEventListener('DOMContentLoaded', () => {
    let currentGameIndex = 0;
    const container = document.getElementById('panel-juego');

    function renderGame(index) {
        const game = gamePanel[index];
        if (!game) return;

        // Fade-out antes de cambiar contenido
        container.classList.add('fade-out');

        setTimeout(() => {
            // Renderizamos el juego con clase de animación incluida
            container.innerHTML = `
            <section class="video game-transition" data-game="${game.id}">
                <table>
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td id="video-cell">
                                        <model-viewer 
                                            src="${game.modelviewer}" 
                                            alt="${game.title}" 
                                            camera-controls 
                                            auto-rotate 
                                            shadow-intensity="1" 
                                            style="width:673px; height:380px; background:#000;"> 
                                        </model-viewer>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="selectores">
                                        <div class="dots">
                                            ${gamePanel.map((_, i) => `
                                                <span 
                                                    class="dot ${i === index ? 'active' : ''}" 
                                                    data-index="${i}">
                                                    .
                                                </span>
                                            `).join('')}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>

                        <td>
                            <table>
                                ${game.thumbnails.map((thumb, i) => `
                                    <tr>
                                        <td class="thumbnails">
                                            <img 
                                                src="${thumb}" 
                                                width="30" 
                                                class="thumb"
                                                ${game.thumbnailVideos[i] ? `data-video="${game.thumbnailVideos[i]}"` : ""}>
                                        </td>
                                    </tr>
                                `).join('')}
                                <tr>
                                    <td class="thumbnails">
                                        <img 
                                            src="/img/Chevron right.png"
                                            width="48"
                                            class="chevron-next">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <aside class="descripcion">
                    <h2>${game.title}</h2>
                    <p>${game.description}</p>
                    <img 
                        src="${game.posterImage}" 
                        alt="${game.title}" 
                        width="300" 
                        height="112">
                    <a href="./registro/registro.html">Jugar ahora</a>
                </aside>
            </section>
            `;

            // Inicializamos miniaturas
            initGameGallery();

            // DOTS: cambiar juego con transición
            const dots = container.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.addEventListener('click', e => {
                    e.preventDefault();
                    const newIndex = Number(dot.dataset.index);
                    if (newIndex === currentGameIndex) return;

                    // Remover clase active del dot anterior
                    const prevDot = container.querySelector('.dot.active');
                    if (prevDot) prevDot.classList.remove('active');

                    currentGameIndex = newIndex;
                    renderGame(currentGameIndex);

                    // Agregar clase active al nuevo dot con pequeño delay para animación
                    const nextDot = container.querySelector(`.dot[data-index="${currentGameIndex}"]`);
                    if (nextDot) {
                        setTimeout(() => nextDot.classList.add('active'), 50);
                    }
                });
            });

            // CHEVRON: animación bonita
            const chevron = container.querySelector('.chevron-next');
            if (chevron) {
                chevron.addEventListener('click', () => {
                    // Remover clase active del dot actual
                    const prevDot = container.querySelector('.dot.active');
                    if (prevDot) prevDot.classList.remove('active');

                    currentGameIndex = (currentGameIndex + 1) % gamePanel.length;
                    renderGame(currentGameIndex);

                    // Agregar clase active al nuevo dot con delay
                    const nextDot = container.querySelector(`.dot[data-index="${currentGameIndex}"]`);
                    if (nextDot) {
                        setTimeout(() => nextDot.classList.add('active'), 50);
                    }

                    // Aplicar animación al nuevo section después de renderizar
                    setTimeout(() => {
                        const section = container.querySelector('section.video');
                        if(section){
                            section.classList.add('game-transition');
                        }
                    }, 50);
                });
            }

            // Fade-in
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
            setTimeout(() => container.classList.remove('fade-in'), 400);

        }, 150); // espera para fade-out
    }

    // Render inicial
    renderGame(currentGameIndex);
});
