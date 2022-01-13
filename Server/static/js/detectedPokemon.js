const finishSound = new Audio('https://vgmsite.com/soundtracks/pokemon-black-and-white/uxmulmut/116%20Level%20Up%21.mp3');

document.addEventListener("DOMContentLoaded", async (event) => {
    const detectedPokemon = document.getElementById('result');
    const socket = io();

    socket.on('detected_pokemon', (pokemon) => {
        if (pokemon.length === 0) {
            return;
        }

        if (pokemon[0] === "Kleinstern") {
            detectedPokemon.innerText = "Kleinstein";
            pokemon[0] = "Kleinstein"
        } else if (pokemon[0] === "Rossan") {
            detectedPokemon.innerText = "Rossana";
            pokemon[0] = 'Rossana';
        } else {
            detectedPokemon.innerText = pokemon[0];
        }

        checkGameEnd(pokemon[0])
    });
});

let gameFinished = false;

function checkGameEnd(pokemon) {
    if (pokemon !== window.pokemon.name || gameFinished) {
        return;
    }
    gameFinished = true;
    finishSound.play();

    const canvas = document.getElementById('silhouette-hint');
    canvas.parentElement.classList.remove('hint-active');
    canvas.classList.add('hidden');
    const finishImage = document.getElementById('finish-img');
    finishImage.src = window.pokemon.image;
    finishImage.parentElement.classList.remove('hidden');
    const hintButton = document.getElementById('hint-button');
    hintButton.disabled = true;
}