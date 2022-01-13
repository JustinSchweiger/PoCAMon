document.addEventListener("DOMContentLoaded", async (event) => {
    const buttonSound = new Audio('https://puu.sh/ICnAf.mp3');
    const reloadButton = document.getElementById('reload-button');

    reloadButton.addEventListener('click', () => {
        buttonSound.play();
        location.reload();
    })
});