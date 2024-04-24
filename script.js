async function init() {
    // let url2 = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let post = document.getElementById('post');

    let results = responseAsJson['results'];

    // console.log(results[0]['name']);

    for (let i = 0; i < results.length; i++)  {

        let pokemon = `https://pokeapi.co/api/v2/pokemon/${results[i]['name']}`
        let pokemon_response = await fetch(pokemon);
        let json_pokemon = await pokemon_response.json();

       


        // console.log(json_pokemon['sprites']['other']['dream_world']['front_default'])
      
        
        post.innerHTML += /*html*/ `            
            <div class="start_app" id="start" onclick="getPokemonProfil('${encodeURIComponent(JSON.stringify(json_pokemon))}')">
                <div class="pokemon_name">
                    <div>${results[i]['name']}</div>
                    <div>${json_pokemon['types'][0]['type']['name']}</div>                
                    <img src="${json_pokemon['sprites']['other']['dream_world']['front_default']}" alt="">
                </div>
        `;  

        // if (json_pokemon['types'][0]['type']['name'] === "grass") {
        //     document.getElementById('start').classList.add("background_color");            
        // }
    }
    
        
        

}
    


function getPokemonProfil(obj) {
    obj =  JSON.parse(decodeURIComponent(obj));
    console.log(obj)
}

    // post.innerHTML = /*html*/`
    //     <div class="pokemon_headline">
    //         <h1 class="pokemon_name">${responseAsJson['name']}</h1>
    //         <img src="${responseAsJson['sprites']['front_shiny']}" alt="">
    //     </div>
    //     <div class="pokemon_info"> 
    //         <h1>Poxedex Data</h1>
    //         <h2>Category</h2>            
    //     </div>
    // `;

    // console.log(responseAsJson);


    // sprites/front_shiny

