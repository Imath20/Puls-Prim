function search() {
    var rooms = document.querySelector('select[name="rooms"]').value;
    var floor = document.querySelector('select[name="floor"]').value;
    var location = document.querySelector('select[name="location"]').value;

    // Trimite cererea GET către server
    fetch('Server.php?rooms=' + rooms + '&floor=' + floor + '&location=' + location)
        .then(response => response.json())
        .then(data => {
            // Manipulează datele primite și actualizează interfața
            var resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = ''; // Curățăm conținutul anterior

            if (data) {
                var ul = document.createElement('ul');
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var li = document.createElement('li');
                        li.textContent = key + ': ' + data[key];
                        ul.appendChild(li);
                    }
                }
                resultsContainer.appendChild(ul);
            } else {
                resultsContainer.textContent = 'Niciun rezultat găsit conform criteriilor selectate.';
            }
        })
        .catch(error => {
            console.error('Eroare la preluarea datelor:', error);
            // Poți afișa un mesaj de eroare în interfață în cazul unei erori de comunicare cu serverul
        });
}
