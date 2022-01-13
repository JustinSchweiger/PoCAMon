document.addEventListener("DOMContentLoaded", async (event) => {
    const url = 'http://localhost:5000/pokemon'
    fetch(url)
        .then(response => response.json())
        .then(json => {
            window.pokemon = json;
        });
});