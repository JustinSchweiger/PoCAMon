import fetch from 'node-fetch';
import {JSDOM} from "jsdom";
import getPokemonList from "./getPokemonList.js";
import getPokemonImages from "./getPokemonImages.js";
import getPokemonData from "./getPokemonData.js";
import {writeJsonFile} from 'write-json-file';

(async () => {
    console.log('Fetching the pokemon list ...');
    const response = await fetch('https://www.pokewiki.de/Rangliste_der_Pok%C3%A9mon_der_1._Generation');
    const doc = new JSDOM(await response.text());
    const document = doc.window.document;
    const pokemonList = getPokemonList(document);
    console.log('[--- Done ---]');

    console.log();
    console.log('Fetching additional Data from ' + pokemonList.length + ' pokemon!');
    const pokemonListWithData = await getPokemonData(pokemonList);

    console.log();
    console.log('Fetching the images of ' + pokemonList.length + ' pokemon!');
    const pokemonListWithImages = await getPokemonImages(pokemonListWithData);

    console.log('Writing data to JSON ...');
    await writeJsonFile('./output/data.json', pokemonListWithImages);
    console.log('[--- Done ---]');
})();
