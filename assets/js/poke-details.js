const backBtn = document.querySelector('.back-btn')
const params = new URLSearchParams(window.location.search)
const itemId = params.get('id')
const url = `https://pokeapi.co/api/v2/pokemon/${itemId}`
const detailsCard = document.querySelector('.details')
const loader = document.querySelector('.loader')

setTimeout(()=>{
    loader.style.display ='none'
    detailsCard.style.display ='block'
}, 1000)

function convertDecimetersToMeters(decimeter) {
    const convertedToMeters = decimeter / 10
    return convertedToMeters.toFixed(2)
}

function convertHectogramsToKilograms(hectograms) {
    const convertedTokilograms = hectograms * 0.1
    return convertedTokilograms.toFixed(2)
}

async function fetchPokemonDetaisl() {
    try {
        const response = await fetch(url)
        const pokemon = await response.json()
        const species = pokemon.species.url
        const { name, id, types, sprites, height, weight, abilities } = pokemon
        const [type] = types
        const pokeImage = sprites.other.dream_world.front_default

        console.log(pokemon)
        const speciesResponse = await fetch(species)
        const pokeSpecies = await speciesResponse.json()

        createDetailPokemon(
            { name, id, type, types, height, weight, abilities, pokeImage },
            pokeSpecies
        )

    } catch (erro) {
        console.erro("Erro fetching data:", erro)
    }

}

function createDetailPokemon({ name, id, type, types, height, weight, abilities, pokeImage }, pokeSpecies) {
    const detailPokemon = `
        <div class="title-card ${type.type.name}">
                <a href="index.html">
                    <i class="fa-solid fa-arrow-left back-btn"></i>
                </a>
            <div class="pokemon-header">
                <span class="pokemon-name">${name}</span>
                <span class="pokemon-id">${id}</span>
            </div>

            <ul class="types-detail">
                ${types.map((type) => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('')}
            </ul>
          
                <img src="${pokeImage}" alt="${name}">
            
        </div>

        <div class="stats-card">
            <span class="stats-title">About</span>
            <ul class="stats">
                <li class="stats-item">
                    <span>Habitat:</span>
                    <span>${pokeSpecies.habitat.name}</span>
                </li>
                <li class="stats-item">
                    <span>Height:</span>
                    <span>${convertDecimetersToMeters(height)} m </span>
                </li>
                <li class="stats-item">
                    <span>Weight:</span>
                    <span>${convertHectogramsToKilograms(weight)} Kg</span>
                </li>
                <li class="stats-item">
                    <span>Abilities:</span>
                    ${abilities.map((ability) => `<span>${ability.ability.name}</span>`).join(', ')}
                </li>
            </ul>
        </div>
    `

    return detailsCard.innerHTML = detailPokemon
}

fetchPokemonDetaisl()
