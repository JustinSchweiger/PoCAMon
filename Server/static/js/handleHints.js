const outOfTips = new Audio('https://puu.sh/ICgKX.mp3');
const buttonSound = new Audio('https://puu.sh/ICnAf.mp3');

document.addEventListener("DOMContentLoaded", async (event) => {
    const hintButton = document.getElementById('hint-button');
    const newHintMessage = document.getElementById('new-hint-message');
    let hintsGiven = 0;
    let availableHints = 0;

    setInterval(() => {
        if (hintsGiven === 6) {
            return;
        }

        if (availableHints === 0) {
            newHintMessage.style.marginTop = '-75px';
            availableHints++;
        }
    }, 10000);


    hintButton.addEventListener('click', () => {
        if (availableHints === 0) {
            outOfTips.play();
            return;
        }

        newHintMessage.style.marginTop = '0';

        if (hintsGiven === 6) {
            return;
        }

        switch (hintsGiven) {
            case 0:
                // Hint 1
                const size = document.getElementById('size-hint');
                const sizeHintContainer = document.getElementById('size-hint-container');
                sizeHintContainer.prepend(document.createTextNode('Größe:'))
                size.innerText = window.pokemon.size;
                sizeHintContainer.classList.add('hint-active');
                break;
            case 1:
                // Hint 2
                const color = document.getElementById('color-hint');
                const colorHintContainer = document.getElementById('color-hint-container');
                colorHintContainer.prepend(document.createTextNode('Farbe:'))
                color.innerText = window.pokemon.color;
                color.parentElement.classList.add('hint-active');
                break;
            case 2:
                // Hint 3
                const type1 = document.getElementById('type-1-hint');
                const type2 = document.getElementById('type-2-hint');

                const types = window.pokemon.types;
                type1.classList.add(types[0]);

                if (types[1]) {
                    type2.classList.add(types[1]);
                }
                break;
            case 3:
                // Hint 4
                const pokedex = document.getElementById('pokedex-hint');
                pokedex.innerText = (window.pokemon.pokedexEntry).replace((window.pokemon.name).toUpperCase(), '...');
                pokedex.parentElement.classList.add('hint-active');
                break;
            case 4:
                // Hint 5
                const cry = document.getElementById('cry-button');
                const soundStatus = document.getElementById('sound-status');
                soundStatus.classList.add('sound-loaded')
                cry.addEventListener('click', () => {
                    const a = new Audio(window.pokemon.cry);
                    a.play();
                });
                break;
            case 5:
                // Hint 5
                const canvas = document.getElementById('silhouette-hint');
                canvas.parentElement.classList.add('hint-active');
                const ctx = canvas.getContext('2d');
                const img = new Image;
                img.onload = function () {
                    const wrh = img.width / img.height;
                    let newWidth = canvas.width;
                    let newHeight = newWidth / wrh;
                    if (newHeight > canvas.height) {
                        newHeight = canvas.height;
                        newWidth = newHeight * wrh;
                    }
                    const xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
                    const yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

                    ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
                    ctx.globalCompositeOperation = "source-in";
                    ctx.fillStyle = "#000";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                };
                img.src = window.pokemon.image;
                break;
        }
        buttonSound.play();
        hintsGiven++;
        availableHints--;
    });
});