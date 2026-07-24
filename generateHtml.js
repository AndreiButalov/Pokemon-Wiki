function generateAboutContent(i) {
    let obj = arrPokemons[i];

    return  `<div class="show_pokemon_container">
                <div class="content_links">
                    <a href="#" onclick="getAbout()">About</a>
                    <a href="#" onclick="getBaseStatus()">Base Status</a>
                </div>
                <div class="base_status" id="base_status">
                    <div class="chart-container">
                        <canvas  id="myChart"></canvas>
                    </div> 
                </div>
                <div class="show_pokemon_content" id="show_pokemon_content">
                    <div>
                        ${generateHtmlAboutContentTable(i, obj)}
                    </div>                
                </div>
            </div>`;
}



function generateHtmlShowPokemon(i) {
    let obj = arrPokemons[i];

    return `
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
                <div class="show_pokemon_title_img">
                    <img class="show_pokemon_image" src="${obj['sprites']['other']['dream_world']['front_default']}">
                </div>                
            </div>
            ${generateAboutContent(i)}            
    </div>`;
}



function generateInitPokemon(i, pokemonName, pokemonData) {
    return `            
        <div class="start_app" id="start${i}" onclick="getPokemonProfil(${i})">
            <div class="pokemon_name">
                <h1>${pokemonName.capitalize()}</h1>
                <div class="pokemon_name_title">
                    <div class="pokemon_name_border">${pokemonData['types'][0]['type']['name']}</div>
                    <div class="pokemon_name_border" id="poison${i}"></div>
                </div>
                <img src="${pokemonData['sprites']['other']['dream_world']['front_default']}">
            </div>
        </div>`;
}



function generateHtmlAboutContentTable(i, obj) {
    return `<table>
                <tr>
                    <td class="bold">Type</td>
                    <td>${getType(i)}</td>                       
                </tr>
                <tr>
                    <td class="bold">Height</td>
                    <td>${obj['height']}</td>
                </tr>
                <tr>
                    <td class="bold">Weght</td>
                    <td>${obj['weight'] / 10} kg</td>
                </tr>
                <tr>
                    <td class="bold">HP</td>
                    <td>${arrPokemons[i]['stats'][0]['base_stat']}</td>                       
                </tr>
                <tr>
                    <td class="bold">Speed</td>
                    <td>${arrPokemons[i]['stats'][5]['base_stat']}</td>                       
                </tr>
                <tr>
                    <td class="bold">Abilites</td>
                    <td>${getAbilities(i)}</td>
                </tr>                    
                <tr>
                    <td class="bold">Location</td>
                    <td>${pokemonLocations[i]}</td>                       
                </tr>
            </table>`
}


