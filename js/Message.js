document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenim trimiterea formularului

    let formData = new FormData(this);

    fetch('sendEmail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Mesajul tău a fost trimis cu succes!');
            this.reset(); // Resetează formularul după trimitere
        } else {
            alert('A apărut o problemă. Te rugăm să încerci din nou mai târziu.');
        }
    })
    .catch(error => {
        console.error('Eroare:', error);
    });
});
