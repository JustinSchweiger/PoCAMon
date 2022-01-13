document.addEventListener("DOMContentLoaded", async (event) => {
    const hintButton = document.getElementById('hint-button');
    let hintsGiven = 0;
    const newTip = new Audio('https://puu.sh/ICam7.mp3');
    const outOfTips = new Audio('https://puu.sh/ICgKX.mp3');

    hintButton.addEventListener('click', () => {
        if (hintsGiven === 6) {
            outOfTips.play();
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
        newTip.play();

        hintsGiven++;
    })
});

const pokemonNames = [
    'Abra',
    'Aerodactyl',
    'Alpollo',
    'Amonitas',
    'Amoroso',
    'Aquana',
    'Arbok',
    'Arkani',
    'Arktos',
    'Austos',
    'Bibor',
    'Bisaflor',
    'Bisaknosp',
    'Bisasam',
    'Blitza',
    'Bluzuk',
    'Chaneira',
    'Digda',
    'Digdri',
    'Ditto',
    'Dodri',
    'Dodu',
    'Dragonir',
    'Dragoran',
    'Dratini',
    'Duflor',
    'Eletek',
    'Enton',
    'Entoron',
    'Evoli',
    'Flamara',
    'Flegmon',
    'Fukano',
    'Gallopa',
    'Garados',
    'Gengar',
    'Georok',
    'Geowaz',
    'Giflor',
    'Glumanda',
    'Glurak',
    'Glutexo',
    'Golbat',
    'Goldini',
    'Golking',
    'Habitak',
    'Hornliu',
    'Hypno',
    'Ibitak',
    'Jugong',
    'Jurob',
    'Kabuto',
    'Kabutops',
    'Kadabra',
    'Kangama',
    'Karpador',
    'Kicklee',
    'Kingler',
    'Kleinstern',
    'Knofensa',
    'Knogga',
    'Knuddeluff',
    'Kokowei',
    'Kokuna',
    'Krabby',
    'Lahmus',
    'Lapras',
    'Lavados',
    'Lektrobal',
    'Machollo',
    'Machomei',
    'Magmar',
    'Magnetilo',
    'Magneton',
    'Maschock',
    'Mauzi',
    'Menki',
    'Mew',
    'Mewtu',
    'Muschas',
    'Myrapla',
    'Nebulak',
    'Nidoking',
    'Nidoqueen',
    'Nidoran',
    'Nidorana',
    'Nidorina',
    'Nidorino',
    'Nockchan',
    'Omot',
    'Onix',
    'Owei',
    'Pantimos',
    'Paras',
    'Parasek',
    'Piepi',
    'Pikachu',
    'Pinsir',
    'Pixi',
    'Ponita',
    'Porenta',
    'Porygon',
    'Pummeluff',
    'Quappo',
    'Quapsel',
    'Quaputzi',
    'Raichu',
    'Rasaff',
    'Rattfratz',
    'Rattikarl',
    'Raupy',
    'Relaxo',
    'Rettan',
    'Rihorn',
    'Rizeros',
    'Rossana',
    'Safcon',
    'Sandamer',
    'Sandan',
    'Sarzenia',
    'Schiggy',
    'Schillok',
    'Schlurp',
    'Seemon',
    'Seeper',
    'Sichlor',
    'Simsala',
    'Sleima',
    'Sleimok',
    'Smettbo',
    'Smogmog',
    'Smogon',
    'Snobilikat',
    'Starmie',
    'Sterndu',
    'Tangela',
    'Tauboga',
    'Tauboss',
    'Taubsi',
    'Tauros',
    'Tentacha',
    'Tentoxa',
    'Tragosso',
    'Traumato',
    'Turtok',
    'Ultrigaria',
    'Voltobal',
    'Vulnona',
    'Vulpix',
    'Zapdos',
    'Zubat'
]