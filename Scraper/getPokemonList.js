import uniq from 'unique-objects';

const getPokemonList = (document) => {
    const pokemonTable = document.querySelectorAll('.round > tbody tr');

    let pokemonList = [];
    pokemonTable.forEach(pokemon => {
        pokemonList.push(
            {
                id: pokemon.childNodes[3].textContent.trim(),
                name: pokemon.childNodes[7].firstChild.textContent.trim(),
                link: 'https://www.pokewiki.de/' + pokemon.childNodes[7].firstChild.textContent.trim(),
                cardLink: 'https://www.pokewiki.de/' + pokemon.childNodes[7].firstChild.textContent.trim() + '_(TCG)'
            }
        );
    });

    pokemonList.shift();
    pokemonList = uniq(pokemonList, ['id']);

    return pokemonList;
}

export default getPokemonList;