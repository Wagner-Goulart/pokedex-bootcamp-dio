const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loader = document.querySelector('.loader')
const goToTopBtn = document.querySelector('.go-top-btn')
let limit = 10
let offset = 0
const maxRecords = 151

setTimeout(()=> {
    loader.style.display = 'none'
    pokemonList.style.display = 'grid'
    loadMoreButton.style.display ='block'
}, 1000)

loadPokemonItens(offset, limit)

goToTopBtn.addEventListener('click', ()=> {
    window.scrollTo(0, 0)
})

document.addEventListener('scroll', ()=> {
    if(window.scrollY > 400) {
        goToTopBtn.style.display = 'block'
    } else {
        goToTopBtn.style.display = 'none'
    }
})

function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-item-id = "${pokemon.number}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                 <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src=${pokemon.photo} alt="${pokemon.name}">
            </div>
        </li>
    `

}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('')
            const listItens = document.querySelectorAll('.pokemon')

            listItens.forEach((item)=> {

                item.addEventListener('click', ()=>{
                    const iD = item.getAttribute('data-item-id')

                    if(iD){
                        window.location.href = `pokeDetails.html?id=${iD}`
                    }

                })
              
            })
        })
}

loadMoreButton.addEventListener('click',()=>{
    offset += limit
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
   
})

