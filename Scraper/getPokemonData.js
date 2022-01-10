import fetch from "node-fetch";
import {JSDOM} from "jsdom";
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

const getPokemonData = async (pokemonList) => {
    const newPokemonList = [];

    const bar = new cliProgress.SingleBar({
        format: 'Get Data |' + colors.cyan('{bar}') + '| {percentage}% | {value}/{total} Pokemon | Duration: {duration_formatted} | ETA: {eta_formatted}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    bar.start(pokemonList.length, 0);

    for (const pokemon of pokemonList) {
        const response = await fetch(pokemon.link);
        const doc = new JSDOM(await response.text());
        const document = doc.window.document;

        const size = document.querySelector('.right > tbody a[title="Größe"]')
            .parentElement
            .parentElement
            .childNodes[3]
            .firstChild
            .textContent
            .trim();

        const color = document.querySelector('.right > tbody a[title="Farbe"]')
            .parentElement
            .parentElement
            .childNodes[3]
            .firstChild
            .textContent
            .trim();

        const cry = document.querySelector('#mp3handler-audio1 > source:nth-child(1)').src;

        // Getting the image is a bit disgusting cause the devs from Pokewiki tried to make it as hard as possible to scrape their page
        // The main image has 4 different selectors, depending on the pokemon
        const imageElem1 = document.querySelector(
            '.right > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > span:nth-child(5) > a:nth-child(1) > img:nth-child(1)'
        );
        const imageElem2 = document.querySelector(
            'span.clicktoggle-target:nth-child(6) > a:nth-child(1) > img:nth-child(1)'
        );
        const imageElem3 = document.querySelector(
            '.right > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)'
        );
        const imageElem4 = document.querySelector(
            'span.clicktoggle-target:nth-child(9) > a:nth-child(1) > img:nth-child(1)'
        );

        let image = null;
        if (imageElem1) {
            image = 'https://www.pokewiki.de' + imageElem1.src;
        } else if (imageElem2) {
            image = 'https://www.pokewiki.de' + imageElem2.src;
        } else if (imageElem3) {
            image = 'https://www.pokewiki.de' + imageElem3.src;
        } else {
            image = 'https://www.pokewiki.de' + imageElem4.src;
        }

        const typeTable = document.querySelector(
            '.right > tbody a[title="Typ"], a[title="Typen"]'
        ).parentElement.parentElement;

        const types = typeTable.querySelector(
            '.right > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)'
        );

        let type1 = null;
        let type2 = null;

        if (types.childNodes.length > 3) {
            type1 = types.childNodes[0].firstChild.title;
            type2 = types.childNodes[2].firstChild ? types.childNodes[2].firstChild.title : null;
        } else {
            type1 = types.childNodes[0].firstChild.title;
        }

        const pokedexEntry = document.querySelector(
            'div.pokedex-eintraege > div:nth-child(2) > div:nth-child(3)'
        ).textContent;

        const data = {
            size,
            color,
            cry,
            image,
            types: [
                type1,
                type2
            ].filter(Boolean),
            pokedexEntry
        };

        newPokemonList.push({...pokemon, ...data});
        bar.increment();
    }

    bar.stop();
    return newPokemonList;
}

export default getPokemonData;