function initGameGallery() {
    const thumbnails = document.querySelectorAll('.thumb');
    const videoCell = document.getElementById('video-cell');
    if (!videoCell) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', e => {
            e.preventDefault();

            // Limpiar contenido anterior
            document.getElementById('iframe')?.remove();
            document.getElementById('main-image')?.remove();

            // Crear iframe o imagen según data-video
            if (thumb.dataset.video) {
                const newIframe = document.createElement('iframe');
                newIframe.id = 'iframe';
                newIframe.width = '673';
                newIframe.height = '380';
                newIframe.src = thumb.dataset.video;
                newIframe.allow = 'autoplay';
                newIframe.frameBorder = '0';
                newIframe.referrerPolicy = 'strict-origin-when-cross-origin';
                videoCell.appendChild(newIframe);
            } else {
                const img = document.createElement('img');
                img.id = 'main-image';
                img.src = thumb.src;
                img.style.width = '673px';
                img.style.height = '380px';
                img.style.objectFit = 'cover';
                videoCell.appendChild(img);
            }
        });
    });
}