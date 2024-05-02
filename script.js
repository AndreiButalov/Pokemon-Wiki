let arrPokemon = [];

async function init() {
    await renderPokemon();
    // renderChart();
}

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

        arrPokemon.push(json_pokemon);

        post.innerHTML += generateInitPokemon(i, results);

        checkPoison(i, json_pokemon);

        let startStyle = document.getElementById(`start${i}`);

        backgroundColor(json_pokemon, startStyle);

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
        <div class="start_app" id="start${i}" onclick="getPokemonProfil(${i}, '${encodeURIComponent(JSON.stringify(arrPokemon))}')">
        <div class="pokemon_name">
            <h1>${results[i]['name'].capitalize()}</h1>
            <div class="pokemon_name_title">
                <div class="pokemon_name_border">${arrPokemon[i]['types'][0]['type']['name']}</div>
                <div class="pokemon_name_border" id="poison${i}"></div>   
            </div>                           
            <img src="${arrPokemon[i]['sprites']['other']['dream_world']['front_default']}">
        </div>
    `;
}


function searchPokemon() {
    let input = document.getElementById('input').value;

    for (let i = 0; i < arrPokemon.length; i++) {
        if (input.toLowerCase() == arrPokemon[i]['name']) {
            getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemon)))
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
            
            ${generateShowContent(i, encodeURIComponent(JSON.stringify(arr)))}
        </div>          
    `;
    let show_pokemon_poison = document.getElementById('show_pokemon_poison');

    if (obj['types'].length == 2) {
        show_pokemon_poison.innerHTML = 'poison'
    } else {
        show_pokemon_poison.style = 'display: none;';
    }

    let show_pokemon_backgroung = document.getElementById('show_pokemon_backgroung');
    backgroundColor(obj, show_pokemon_backgroung);
}


function generateShowContent(i, arr) {
    arr = JSON.parse(decodeURIComponent(arr));
    obj = arr[i];

    return /*html*/ `
        <div class="show_pokemon_container">
            <div class="content_links">
                <a href="#">About</a>
                <a href="#">Base Status</a>
            </div>
            <div class="show_pokemon_content">
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
                            <td></td>
                        </tr>
                    </table>
                    <h1>Breeding</h1>
                    <table>
                        <tr>
                            <td>Species</td>
                            <td></td>                       
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Weght</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Abilites</td>
                            <td></td>
                        </tr>
                    </table>

                </div>
                <!-- <div>
                    <canvas id="myChart"></canvas>
                </div>  -->
            </div>
        </div>
    `;
    
    // let show_pokemon_poison = document.getElementById('show_pokemon_poison');

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
    if (i == (arrPokemon.length - 1)) {
        i = 0;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemon)));
    } else {
        i++;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemon)));
    }
}



function backPokemon(i) {
    if (i == 0) {
        i = arrPokemon.length - 1;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemon)));
    } else {
        i--;
        getPokemonProfil(i, encodeURIComponent(JSON.stringify(arrPokemon)));
    }
}