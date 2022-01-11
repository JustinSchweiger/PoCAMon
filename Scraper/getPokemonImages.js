import fetch from "node-fetch";
import {JSDOM} from "jsdom";
import cliProgress from "cli-progress";
import colors from "ansi-colors";

const getPokemonImages = async (pokemonList) => {
    let newPokemonList = [];

    const bar = new cliProgress.SingleBar({
        format: 'Get Image Links |' + colors.cyan('{bar}') + '| {percentage}% | {value}/{total} Pokemon | Duration: {duration_formatted} | ETA: {eta_formatted}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    bar.start(pokemonList.length, 0);

    for (const pokemon of pokemonList) {
        const response = await fetch(pokemon.cardLink);
        const doc = new JSDOM(await response.text());
        const document = doc.window.document;

        const table = Array.from(document.querySelectorAll('.round > tbody:nth-child(1) > tr td[rowspan]'))
            .filter(function (_, index) {
                return index % 2 === 0;
            });

        const maxCards = 15;
        let tableIndex = 0;
        const imageLinks = [];

        for (const row of table) {
            if (tableIndex === maxCards) {
                continue;
            }

            const link = row.firstChild.href ? row.firstChild.href : row.childNodes[1].href;

            if (blacklistedLinks.includes('https://www.pokewiki.de' + link)) {
                continue;
            }

            const response = await fetch('https://www.pokewiki.de' + link);
            const doc = new JSDOM(await response.text());
            const document = doc.window.document;

            let imageLink = document.querySelector('.bild img').getAttribute('srcset')
                ? document.querySelector('.bild img')
                    .getAttribute('srcset')
                : document.querySelector('.bild img')
                    .getAttribute('src')

            imageLinks.push('https://www.pokewiki.de' + imageLink.replace(/(.*),\s/, '').replace(/\s.*/, ''));
            tableIndex++;
        }

        bar.increment();
        newPokemonList.push({...pokemon, cardImages: imageLinks});
    }

    bar.stop();
    return newPokemonList;
}

const blacklistedLinks = [
    'https://www.pokewiki.de/Dunkles_Gengar_(Trading_Card_Game_2_H26)',
    'https://www.pokewiki.de/Schillok_(Application_Pack)',
    'https://www.pokewiki.de/Raupy_(Application_Pack)',
    'https://www.pokewiki.de/Habitak_(Application_Pack_1)',
    'https://www.pokewiki.de/Habitak_(Application_Pack_2)',
    'https://www.pokewiki.de/Piepi_(Application_Pack)',
    'https://www.pokewiki.de/Dunkles_Pixi_(Trading_Card_Game_2_H30)',
    'https://www.pokewiki.de/Dunkles_Vulnona_(Trading_Card_Game_2_H12)',
    'https://www.pokewiki.de/Myrapla_(Application_Pack)',
    'https://www.pokewiki.de/Enton_(Application_Pack)',
    'https://www.pokewiki.de/Abra_(Application_Pack)',
    'https://www.pokewiki.de/Dunkles_Alpollo_(Trading_Card_Game_2_H25)',
    'https://www.pokewiki.de/Dunkles_Knogga_(Trading_Card_Game_2_H22)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_36)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_37)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_38)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_39)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_40)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_61)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_62)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_63)',
    'https://www.pokewiki.de/Ditto_(EX_Delta_Species_64)',
    'https://www.pokewiki.de/Ditto_(POP_Serie_3_12)',
    'https://www.pokewiki.de/Evoli_(Application_Pack)'
];

export default getPokemonImages;