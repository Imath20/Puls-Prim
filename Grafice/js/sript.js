document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.button');
    const gallery = document.getElementById('gallery');
    const overlay = document.getElementById('overlay');

    button.addEventListener('click', function(e) {
        e.preventDefault();
        gallery.classList.remove('hidden');
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', function() {
        gallery.classList.add('hidden');
        overlay.style.display = 'none';
    });
});