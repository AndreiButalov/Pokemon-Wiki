let arrPokemons = [];
let pokemonLocations = [];
let pokemonEggGroupes = [];

async function renderPokemon() {
    let urlPokemon = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(urlPokemon);
    let responseAsJson = await response.json();

    let post = document.getElementById('post');
    let results = responseAsJson['results'];




    for (let i = 0; i < results.length; i++) {

        let pokemon = `${urlPokemon}/${results[i]['name']}`;
        let pokemon_response = await fetch(pokemon);
        let json_pokemon = await pokemon_response.json();
        
        arrPokemons.push(json_pokemon);
        // console.log(arrPokemons[i]['stats']);

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

        post.innerHTML += generateInitPokemon(i, results);

        checkPoison(i, json_pokemon);

        let startStyle = document.getElementById(`start${i}`);

        backgroundColor(json_pokemon, startStyle);       

        pokemonLocations.push(await getLocation(i)); 
        // renderPokemonChart(i);  
        
        
        
    } 
    
}





function checkPoison(i, json_pokemon) {

    let poison = document.getElementById(`poison${i}`);

    if (json_pokemon['types'].length == 2) {
        poison.innerHTML = 'poison'
    } else {
        poison.style = 'display: none;';
    }
}


function generateInitPokemon(i, results) {

    return `            
        <div class="start_app" id="start${i}" onclick="getPokemonProfil(${i}, '${encodeURIComponent(JSON.stringify(arrPokemons))}')">
        <div class="pokemon_name">
            <h1>${results[i]['name'].capitalize()}</h1>
            <div class="pokemon_name_title">
                <div class="pokemon_name_border">${arrPokemons[i]['types'][0]['type']['name']}</div>
                <div class="pokemon_name_border" id="poison${i}"></div>   
            </div>                           
            <img src="${arrPokemons[i]['sprites']['other']['dream_world']['front_default']}">
        </div>
    `;
}


function searchPokemon() {
    let input = document.getElementById('input').value;

    for (let i = 0; i < arrPokemons.length; i++) {
        if (input.toLowerCase() == arrPokemons[i]['name']) {
            getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemons)))
        } else {

        }
    }

    input.value = '';
}


function getPokemonProfil(i, arr) {

    arr = JSON.parse(decodeURIComponent(arr));

    obj = arr[i];

    let showPokemon = document.getElementById('show_pokemon');
    showPokemon.style.visibility = 'initial';
    
    
    showPokemon.innerHTML = /*html*/ `
        <div class="show_pokemon" id="show_pokemon_backgroung">
            <div class="arrow_left"><button class=" arrow_button" onclick="backPokemon(${i})"><</button></div>
            <div class="arrow_right"><button class=" arrow_button" onclick="nextPokemon(${i})">></button></div>
            <div class="show_pokemon_headline">
                <div>
                    <button onclick="closeWindow()">X</button>
                    <h1>${obj['name'].capitalize()}</h1>
                    <div class="show_pokemon_title">
                        <h2 class="show_pokemon_name">${obj['types'][0]['type']['name']}<h2>
                            <div class="show_pokemon_name" id="show_pokemon_poison"></div>
                        </div>
                    </div>                
                    <img src="${obj['sprites']['other']['dream_world']['front_default']}">
                </div>

                ${generateAboutContent(i, encodeURIComponent(JSON.stringify(arr)))}
                
            </div>          
            `;
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


function generateAboutContent(i, arr) {
    arr = JSON.parse(decodeURIComponent(arr));
    obj = arr[i];

    return /*html*/ `
        <div class="show_pokemon_container">
            <div class="content_links">
                <a href="#" onclick="getAbout()">About</a>
                <a href="#" onclick="getBaseStatus()">Base Status</a>
            </div>
            <div class="base_status" id="base_status">
                <div class="chart-container" style="height:=400px">
                    <canvas  id="myChart"></canvas>
                </div> 
            </div>
            <div class="show_pokemon_content" id="show_pokemon_content">
                <div>
                    <table>
                        <tr>
                            <td>Typ</td>
                            <td>${obj['types'][0]['type']['name']}</td>                       
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>${obj['height']}</td>
                        </tr>
                        <tr>
                            <td>Weght</td>
                            <td>${obj['weight'] / 10} kg</td>
                        </tr>
                        <tr>
                            <td>Abilites</td>
                            <td>${getAbilities(i)}</td>
                        </tr>
                    </table>
                    <h3>Description</h3>
                    <table>
                        <tr>
                            <td>Location</td>
                            <td>${pokemonLocations[i]}</td>                       
                        </tr>
                        
                    </table>

                </div>
                
            </div>
        </div>
    `;


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


async function getLocation(i) {
    let urlPokemon = `https://pokeapi.co/api/v2/location/`;
    let response = await fetch(urlPokemon);
    let responseAsJson = await response.json();
    let cityName = await responseAsJson['results'][i]['name'];
    return cityName.capitalize();
}


// async function getEggGroupe(i) {
//     let urlPokemon = `https://pokeapi.co/api/v2/egg-group/`;    
   
//     // let one = `${urlPokemon}${arrPokemon[i]['id']}`;
//     let one = urlPokemon;
//     let response = await fetch(one);
//     let responseAsJson = await response.json();

//     let eggGroup = await responseAsJson['results'][i]['name'];

//     console.log(eggGroup)

//     // pokemonEggGroupes.push(eggGroup);

//     // let name = responseAsJson['chain']['evolves_to'][0]['species']['name'];


//     // pokemonEvolutionName.push(name);

//     // console.log(responseAsJson['results'][i]['name'])
//     // console.log(responseAsJson['chain']['evolves_to'][0]['species']['name'])


//     // return cityName.capitalize();
// }


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


