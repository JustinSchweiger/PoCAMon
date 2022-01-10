import fetch from 'node-fetch';
import { JSDOM } from "jsdom";
import getPokemonList from "./getPokemonList.js";
import getPokemonImages from "./getPokemonImages.js";
import getPokemonData from "./getPokemonData.js";

(async () => {
    console.log('Fetching the pokemon list ...');
    console.time('  List Took: ');
    const response = await fetch('https://www.pokewiki.de/Rangliste_der_Pok%C3%A9mon_der_1._Generation');
    const doc = new JSDOM(await response.text());
    const document = doc.window.document;
    const pokemonList = getPokemonList(document);
    console.log('[--- Done ---]');
    console.timeEnd('  List Took: ');

    console.log();
    console.log('Fetching additional Data from ' + pokemonList.length + ' pokemon!');
    console.time('  Data Took: ');
    const pokemonListWithData = await getPokemonData(pokemonList);
    console.log('[--- Done ---]');
    console.timeEnd('  Data Took: ');
    console.log(JSON.stringify(pokemonListWithData, null, 2));
    //console.log('Fetching the images of ' + pokemonList.length + ' pokemon!');
    //console.time('  Took: ');
    //const pokemonListWithImages = getPokemonImages(pokemonList);
})();
