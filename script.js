async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon/ditto`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let post = document.getElementById('post');

    post.innerHTML = /*html*/`
        <div class="pokemon_headline">
            <h1 class="pokemon_name">${responseAsJson['name']}</h1>
            <img src="${responseAsJson['sprites']['front_shiny']}" alt="">
        </div>
        <div class="pokemon_info"> 
            <h1>Poxedex Data</h1>
            <h2>Category</h2>
            <span>Height</span>
            <span>Weight</span>
            <span>Capture Rate</span>
            <span>Category</span>
        </div>
    `;

    console.log(responseAsJson);


    // sprites/front_shiny

}