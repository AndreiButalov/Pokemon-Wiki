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
                <div>${results[i]['name'].capitalize()}</div>
                <div>${json_pokemon['types'][0]['type']['name']}</div>
                <div id="poison${i}"></div>              
                <img src="${json_pokemon['sprites']['other']['dream_world']['front_default']}" alt="">
                </div>
                `;  

        let poison = document.getElementById(`poison${i}`);


        if (json_pokemon['types'].length == 2) {
            poison.innerHTML = 'poison'
        }


        let startStyle = document.getElementById(`start${i}`);

        switch (json_pokemon['types'][0]['type']['name']) {
            case 'grass':
                startStyle.style = 'background-color: lightgreen;';
            break;
            case 'fire':
                startStyle.style = 'background-color: lightcoral;';
                break;
            case 'water':
                startStyle.style = 'background-color: lightskyblue;';
                break;
                case 'bug':
                    startStyle.style = 'background-color: rgb(217, 217, 40);';
                break;
            case 'normal':
                startStyle.style = 'background-color: lightsalmon;';
                break;
        }
            
    }
        
}



String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
    


function getPokemonProfil(obj) {
    obj =  JSON.parse(decodeURIComponent(obj));
    console.log(obj)
}
