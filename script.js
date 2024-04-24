async function init() {
    // let url2 = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let post = document.getElementById('post');

    let results = responseAsJson['results'];

    // console.log(results[0]['name']);

    for (let i = 0; i < results.length; i++)  {

        let pokemon_image = `https://pokeapi.co/api/v2/pokemon/${results[i]['name']}`
        let pokemon_response = await fetch(pokemon_image);
        let json_pokemon = await pokemon_response.json();
        
        
        
        
        console.log()
        post.innerHTML += /*html*/ `            
            <div class="start_app" id="start">
                <div class="pokemon_name">
                    ${results[i]['name']}
                    ${json_pokemon['types'][0]['type']['name']}
                </div>
                <img src="${json_pokemon['sprites']['front_shiny']}" alt="">
            </div>
            `;  
        // if (json_pokemon['types'][0]['type']['name'] == "grass") {
        //     document.getElementById('start').style = "background-color: green;";            
        // }

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

}