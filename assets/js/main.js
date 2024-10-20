const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')

const maxRecords = 151
const limit = 12
let offset = 0




function loadPokemonItems(limit, offset) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" >
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
    
            </li>
            `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(limit, offset)

loadMoreButton.addEventListener('click', () => {

    offset += limit
    const qtdRecordNextPage = offset + limit


    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(newLimit, offset)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(limit, offset)
    }

})

