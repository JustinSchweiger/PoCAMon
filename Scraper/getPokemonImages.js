import fetch from "node-fetch";
import {JSDOM} from "jsdom";

const getPokemonImages = async (pokemonList) => {
    let list = pokemonList;
    for (const pokemon of pokemonList) {
        const response = await fetch(pokemon.link);
        const doc = new JSDOM(await response.text());
        const document = doc.window.document;

        
    }
}

export default getPokemonImages;