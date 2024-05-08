let pokemonStatsHp = [];
let pokemonStatsAttack = [];
let pokemonStatsDefense = [];
let pokemonStatsSpAttack = [];
let pokemonStatsSpDefense = [];
let pokemonStatsSpeed = [];

let arrLabels = ['hp', 'attack', 'defense', 'sp.attack', 'sp.defence', 'speed'];

let arrBackgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)'
];

let arrBorderColor = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)'
];

function renderChart(i) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arrLabels,
            datasets: [{
                label: 'Status',
                data: [
                    pokemonStatsHp[i],
                    pokemonStatsAttack[i],
                    pokemonStatsDefense[i],
                    pokemonStatsSpAttack[i],
                    pokemonStatsSpDefense[i],
                    pokemonStatsSpeed[i]
                ],
                backgroundColor: arrBackgroundColor,
                borderColor: arrBorderColor,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    stacked: true,
                    grid: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}