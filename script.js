// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el contenedor de la galería
    const gallery = document.getElementById('gallery');
    
    // Obtiene el modal que muestra los detalles de la imagen
    const modal = document.getElementById('image-modal');
    
    // Obtiene los elementos dentro del modal para la imagen y el título
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    
    // Obtiene el botón para cerrar el modal
    const closeBtn = document.querySelector('.close-btn');

    // Función para mostrar los detalles de la imagen en el modal
    function showImageDetails(url, title) {
        // Establece la URL y el título de la imagen en el modal
        modalImage.src = url;
        modalTitle.textContent = title;
        
        // Muestra el modal
        modal.style.display = 'block';
        
        // Añade la clase 'show' al modal para la animación de entrada
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Función para ocultar el modal
    function hideImageDetails() {
        // Quita la clase 'show' del modal para la animación de salida
        modal.classList.remove('show');
        
        // Oculta el modal después de la animación
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Debe coincidir con la duración de la transición
    }

    // Evento para cerrar el modal al hacer clic en el botón de cerrar
    closeBtn.addEventListener('click', hideImageDetails);

    // Evento para manejar clics en la galería de imágenes
    gallery.addEventListener('click', function(event) {
        // Encuentra el elemento de la galería más cercano al objetivo del clic
        const clickedItem = event.target.closest('.gallery-item');
        
        // Si se hizo clic en una imagen y no en un botón
        if (clickedItem && event.target.tagName !== 'BUTTON') {
            // Quita la clase 'selected' de todas las imágenes
            document.querySelectorAll('.gallery-item').forEach(item => item.classList.remove('selected'));
            
            // Añade la clase 'selected' a la imagen clickeada
            clickedItem.classList.add('selected');

            // Muestra los detalles de la imagen en el modal
            const img = clickedItem.querySelector('img');
            const h3 = clickedItem.querySelector('h3');
            showImageDetails(img.src, h3.textContent);
        }
    });

    // Evento para manejar clics en los botones de eliminar y detalles
    gallery.addEventListener('click', function(event) {
        // Encuentra el elemento de la galería más cercano al objetivo del clic
        const clickedItem = event.target.closest('.gallery-item');
        
        // Si se hizo clic en un elemento de la galería
        if (clickedItem) {
            // Si el botón clickeado es de eliminar
            if (event.target.classList.contains('delete-btn')) {
                // Quita la clase 'show' de la imagen para la animación de ocultación
                clickedItem.classList.remove('show');
                
                // Elimina la imagen después de la animación
                setTimeout(() => {
                    gallery.removeChild(clickedItem);
                }, 300); // Espera a que la animación de ocultación termine
                
            // Si el botón clickeado es de detalles
            } else if (event.target.classList.contains('details-btn')) {
                // Muestra los detalles de la imagen en el modal
                const img = clickedItem.querySelector('img');
                const h3 = clickedItem.querySelector('h3');
                showImageDetails(img.src, h3.textContent);
            }
        }
    });
});
