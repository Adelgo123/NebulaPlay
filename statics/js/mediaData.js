document.addEventListener('DOMContentLoaded', () => {
    let currentGameIndex = 0;
    const container = document.getElementById('games-container');

    function renderGame(index) {
        const game = gamesData[index];
        if (!game) return;

        // Generar HTML del juego
        container.innerHTML = `
        <section class="video" data-game="${game.id}">
            <table>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td id="video-cell">
                                    <iframe id="iframe" width="673" height="380" src="${game.mainVideo}" allow="autoplay" frameborder="0" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                                </td>
                            </tr>
                            <tr>
                                <td class="selectores">
                                    <a href="#" class="s1">&#8249;</a>
                                    <a href="#" class="s2">&#8250;</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table>
                            ${game.thumbnails.map((thumb, i) => `
                                <tr>
                                    <td class="thumbnails">
                                        <img src="${thumb}" width="30" class="thumb" ${game.thumbnailVideos[i] ? `data-video="${game.thumbnailVideos[i]}"` : ""}>
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </td>
                </tr>
            </table>
            <aside class="descripcion">
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <img src="${game.posterImage}" alt="${game.title}" width="300px" height="112">
            </aside>
        </section>
        `;

        // Inicializar thumbnails
        initGameGallery();

        // Chevron navigation
        const prev = container.querySelector('.s1');
        const next = container.querySelector('.s2');

        prev.addEventListener('click', e => {
            e.preventDefault();
            currentGameIndex = (currentGameIndex - 1 + gamesData.length) % gamesData.length;
            renderGame(currentGameIndex);
        });

        next.addEventListener('click', e => {
            e.preventDefault();
            currentGameIndex = (currentGameIndex + 1) % gamesData.length;
            renderGame(currentGameIndex);
        });
    }

    renderGame(currentGameIndex);
});
