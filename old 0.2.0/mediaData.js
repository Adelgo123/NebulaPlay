document.addEventListener('DOMContentLoaded', () => {
    let currentGameIndex = 0;
    const container = document.getElementById('games-container');

    function renderGame(index) {
        const game = gamesData[index];
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
                                        <iframe
                                            id="iframe"
                                            width="673"
                                            height="380"
                                            src="${game.mainVideo}"
                                            allow="autoplay"
                                            frameborder="0"
                                            referrerpolicy="strict-origin-when-cross-origin">
                                        </iframe>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="selectores">
                                        <div class="dots">
                                            ${gamesData.map((_, i) => `
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
                </aside>
            </section>
            `;

            // Inicializamos miniaturas
            initGameGallery();

            // DOTS: cambiar juego sin animación
            const dots = container.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.addEventListener('click', e => {
                    e.preventDefault();
                    const newIndex = Number(dot.dataset.index);
                    if (newIndex === currentGameIndex) return;
                    currentGameIndex = newIndex;
                    renderGame(currentGameIndex);
                });
            });

            // CHEVRON: animación bonita
            const chevron = container.querySelector('.chevron-next');
            if (chevron) {
                chevron.addEventListener('click', () => {
                    currentGameIndex = (currentGameIndex + 1) % gamesData.length;
                    renderGame(currentGameIndex);

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
