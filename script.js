async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let post = document.getElementById('post');
    let results = responseAsJson['results'];

    for (let i = 0; i < results.length; i++)  {

        let pokemon = `https://pokeapi.co/api/v2/pokemon/${results[i]['name']}`
        let pokemon_response = await fetch(pokemon);
        let json_pokemon = await pokemon_response.json();  
        
        post.innerHTML += /*html*/ `            
            <div class="start_app" id="start${i}" onclick="getPokemonProfil('${encodeURIComponent(JSON.stringify(json_pokemon))}')">
            <div class="pokemon_name">
                <h1>${results[i]['name'].capitalize()}</h1>
                <div class="pokemon_name_title">
                    <div class="pokemon_name_border">${json_pokemon['types'][0]['type']['name']}</div>
                    <div class="pokemon_name_border" id="poison${i}"></div>   
                </div>
                           
                <img src="${json_pokemon['sprites']['other']['dream_world']['front_default']}">
            </div>
                `;  

        let poison = document.getElementById(`poison${i}`);


        if (json_pokemon['types'].length == 2) {
            poison.innerHTML = 'poison'
        }else {
            poison.style = 'display: none;';
        }


        let startStyle = document.getElementById(`start${i}`);

        backgroundColor(json_pokemon, startStyle);       
            
    }    
    
}

function getPokemonProfil(obj) {
    obj =  JSON.parse(decodeURIComponent(obj));    
    let showPokemon = document.getElementById('show_pokemon');
    showPokemon.style.visibility = 'initial';

    showPokemon.innerHTML = /*html*/ `
        <div class="show_pokemon" id="show_pokemon_backgroung">
            <div class="show_pokemon_headline">
                <button onclick="closeWindow()">X</button>
                <h1>${obj['name'].capitalize()}</h1>
                <div class="show_pokemon_title">
                    <h2 class="show_pokemon_name">${obj['types'][0]['type']['name']}<h2>
                    <div class="show_pokemon_name" id="show_pokemon_poison"></div>
                </div>
                
                <img src="${obj['sprites']['other']['dream_world']['front_default']}">
            </div>
            <div class="show_pokemon_content">

            </div>                  
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


function closeWindow() {
    let showPokemon = document.getElementById('show_pokemon');
    showPokemon.style.visibility = 'hidden';
}


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function backgroundColor(json_pokemon ,id) {
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
    }
}