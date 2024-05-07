let arrPokemons = [];
let pokemonLocations = [];
let pokemonEggGroupes = [];



async function renderPokemon() {
    let urlPokemon = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(urlPokemon);
    let responseAsJson = await response.json();
    generateRenderPokemon(urlPokemon, responseAsJson);
}



async function generateRenderPokemon(urlPokemon, responseAsJson) {
    let post = document.getElementById('post');
    let results = responseAsJson['results'];

    for (let i = 0; i < results.length; i++) {
        let pokemon = `${urlPokemon}/${results[i]['name']}`;
        let pokemon_response = await fetch(pokemon);
        let json_pokemon = await pokemon_response.json();
        arrPokemons.push(json_pokemon);
        post.innerHTML += generateInitPokemon(i, results);
        let startStyle = document.getElementById(`start${i}`);

        checkPoison(i, json_pokemon);
        generateChartPokemon(i);
        backgroundColor(json_pokemon, startStyle);
        pokemonLocations.push(await getLocation(i));
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
    let input = document.getElementById('input').value;
    
    for (let i = 0; i < arrPokemons.length; i++) {
        if (input.toLowerCase() == arrPokemons[i]['name']) {
            getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemons)))
        }
    }
    
    input.value = '';
}



function getPokemonProfil(i, arr) {
    arr = JSON.parse(decodeURIComponent(arr));
    obj = arr[i];

    let showPokemon = document.getElementById('show_pokemon');
    showPokemon.style.visibility = 'initial';
    showPokemon.innerHTML = generateHtmlShowPokemon(i, arr)
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
    let urlPokemon = `https://pokeapi.co/api/v2/location/`;
    let response = await fetch(urlPokemon);
    let responseAsJson = await response.json();
    let cityName = await responseAsJson['results'][i]['name'];
    return cityName.capitalize();
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


