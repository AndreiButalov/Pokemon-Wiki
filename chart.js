let pokemonStatsHp = [];
let pokemonStatsAttack = [];
let pokemonStatsDefense = [];
let pokemonStatsSpAttack = [];
let pokemonStatsSpDefense = [];
let pokemonStatsSpeed = [];

let labels = [];

function renderPokemonChart(i) {         

    labels.push(pokemonStatsHp[i])
    labels.push(pokemonStatsAttack[i])
    labels.push(pokemonStatsDefense[i])
    labels.push(pokemonStatsSpAttack[i])
    labels.push(pokemonStatsSpDefense[i])
    labels.push(pokemonStatsSpeed[i])

    console.log(labels)
}


function renderChart(i) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['hp', 'attack', 'defense', 'sp.attack', 'sp.defence', 'speed'],
            datasets: [{
                label: '# of Votes',
                data: [pokemonStatsHp[i], pokemonStatsAttack[i], pokemonStatsDefense[i], pokemonStatsSpAttack[i], pokemonStatsSpDefense[i], pokemonStatsSpeed[i]],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}