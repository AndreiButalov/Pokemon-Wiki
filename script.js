let arrPokemons = [];
let pokemonLocations = [];
let pokemonEggGroupes = [];
const urlPokemon = `https://pokeapi.co/api/v2/pokemon`;
let nextPokemonUrl = null;
let isLoading = false;



async function renderPokemon() {
    await loadPokemonBatch(`${urlPokemon}?limit=20&offset=0`);
}



async function loadMorePokemons() {
    if (isLoading || !nextPokemonUrl) return;
    await loadPokemonBatch(nextPokemonUrl);
}



async function loadPokemonBatch(url) {
    if (isLoading) return;
    isLoading = true;

    let response = await fetch(url);
    let responseAsJson = await response.json();
    nextPokemonUrl = responseAsJson.next;
    await generateRenderPokemon(responseAsJson);

    let loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.disabled = !nextPokemonUrl;
        loadMoreBtn.textContent = nextPokemonUrl ? 'Weitere 20 Pokémon laden' : 'Keine weiteren Pokémon';
    }

    isLoading = false;
}



async function generateRenderPokemon(responseAsJson) {
    let post = document.getElementById('post');
    let results = responseAsJson['results'];
    let startIndex = arrPokemons.length;
    let html = '';

    for (let index = 0; index < results.length; index++) {
        let result = results[index];
        let pokemon_response = await fetch(`${urlPokemon}/${result['name']}`);
        let json_pokemon = await pokemon_response.json();

        arrPokemons.push(json_pokemon);
        html += generateInitPokemon(startIndex + index, result['name'], json_pokemon);
    }

    post.insertAdjacentHTML('beforeend', html);

    for (let index = 0; index < results.length; index++) {
        let pokemonIndex = startIndex + index;
        let startStyle = document.getElementById(`start${pokemonIndex}`);
        let json_pokemon = arrPokemons[pokemonIndex];

        checkPoison(pokemonIndex, json_pokemon);
        generateChartPokemon(pokemonIndex);
        backgroundColor(json_pokemon, startStyle);
        pokemonLocations.push(await getLocation(pokemonIndex));
    }
}



function generateChartPokemon(i) {
    let hp = arrPokemons[i]['stats'][0]['base_stat'];
    let attack = arrPokemons[i]['stats'][1]['base_stat'];
    let defense = arrPokemons[i]['stats'][2]['base_stat'];
    let spAttack = arrPokemons[i]['stats'][3]['base_stat'];
    let spDefense = arrPokemons[i]['stats'][4]['base_stat'];
    let speed = arrPokemons[i]['stats'][5]['base_stat'];

    pokemonStatsHp.push(hp);
    pokemonStatsAttack.push(attack);
    pokemonStatsDefense.push(defense);
    pokemonStatsSpAttack.push(spAttack);
    pokemonStatsSpDefense.push(spDefense);
    pokemonStatsSpeed.push(speed);
}



function checkPoison(i, json_pokemon) {
    let poison = document.getElementById(`poison${i}`);
    if (json_pokemon['types'].length == 2) {
        poison.innerHTML = 'poison'
    } else {
        poison.style = 'display: none;';
    }
}



function searchPokemon() {
    let input = document.getElementById('input');
    let searchTerm = input.value.trim().toLowerCase();

    for (let i = 0; i < arrPokemons.length; i++) {
        let card = document.getElementById(`start${i}`);
        if (!card) continue;

        let pokemonName = arrPokemons[i]['name'].toLowerCase();
        let matches = searchTerm === '' ? true : pokemonName.startsWith(searchTerm);
        card.style.display = matches ? 'block' : 'none';
    }
}



function getPokemonProfil(i) {
    let obj = arrPokemons[i];

    let showPokemon = document.getElementById('show_pokemon');
    showPokemon.style.visibility = 'initial';
    showPokemon.innerHTML = generateHtmlShowPokemon(i)
    let show_pokemon_poison = document.getElementById('show_pokemon_poison');

    if (obj['types'].length == 2) {
        show_pokemon_poison.innerHTML = 'poison'
    } else {
        show_pokemon_poison.style = 'display: none;';
    }

    let show_pokemon_backgroung = document.getElementById('show_pokemon_backgroung');
    renderChart(i);
    backgroundColor(obj, show_pokemon_backgroung);
}



function getAbilities(i) {
    let arr = arrPokemons[i]['abilities'];
    let arrString = [];
    for (let j = 0; j < arr.length; j++) {
        let abilityName = arr[j]['ability']['name'];
        arrString.push(" " + abilityName.capitalize())
    }
    return arrString;
}



function getType(i) {
    let arr = arrPokemons[i]['types'];
    let arrString = [];
    for (let j = 0; j < arr.length; j++) {
        let type = arr[j]['type']['name'];
        arrString.push(" " + type)
    }
    return arrString;
}



async function getLocation(i) {
    try {
        let urlPokemon = `https://pokeapi.co/api/v2/location/`;
        let response = await fetch(urlPokemon);
        let responseAsJson = await response.json();
        let location = responseAsJson['results'][i];

        if (!location || !location['name']) {
            return 'Unknown';
        }

        return location['name'].capitalize();
    } catch (error) {
        return 'Unknown';
    }
}



function getAbout() {
    let showPokemonContent = document.getElementById('show_pokemon_content');
    showPokemonContent.classList.remove('d_none');

    let showBaseSatus = document.getElementById('base_status');
    showBaseSatus.style.display = "none";
}



function getBaseStatus() {
    let showPokemonContent = document.getElementById('show_pokemon_content');
    showPokemonContent.classList.add('d_none');

    let showBaseSatus = document.getElementById('base_status');
    showBaseSatus.style.display = "block";
}



function closeWindow() {
    let showPokemon = document.getElementById('show_pokemon');
    showPokemon.style.visibility = 'hidden';
}



String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



function backgroundColor(json_pokemon, id) {
    switch (json_pokemon['types'][0]['type']['name']) {
        case 'grass':
            id.style = 'background-color: lightgreen;';
            break;
        case 'fire':
            id.style = 'background-color: lightcoral;';
            break;
        case 'water':
            id.style = 'background-color: lightskyblue;';
            break;
        case 'bug':
            id.style = 'background-color: rgb(217, 217, 40);';
            break;
        case 'normal':
            id.style = 'background-color: lightsalmon;';
            break;
        default:
            id.style = 'background-color: lightblue;';
    }
}



function nextPokemon(i) {
    if (i == (arrPokemons.length - 1)) {
        i = 0;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemons)));
    } else {
        i++;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemons)));
    }
}



function backPokemon(i) {
    if (i == 0) {
        i = arrPokemons.length - 1;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemons)));
    } else {
        i--;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemons)));
    }
}


