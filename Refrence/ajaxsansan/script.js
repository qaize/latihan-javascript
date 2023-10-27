const loadButton = document.getElementById("load-data");
const pokemonList = document.getElementById("pokemon-list");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");

let offset = 0;
const limit = 6;

loadButton.addEventListener("click", loadPokemon);

prevPageButton.addEventListener("click", () => {
    if (offset > 0) {
        offset -= limit;
        loadPokemon();
    }
});

nextPageButton.addEventListener("click", () => {
    offset += limit;
    loadPokemon();
});

function loadPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
            const results = data.results;
            pokemonList.innerHTML = "";

            results.forEach((pokemon) => {
                fetchPokemonData(pokemon.url);
            });
        })
        .catch((error) => console.error("Error:", error));
}

function fetchPokemonData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const pokemonCard = createPokemonCard(data);
            pokemonList.appendChild(pokemonCard);
        })
        .catch((error) => console.error("Error:", error));
}

function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    card.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Height: ${pokemon.height / 10}m</p>
    <p>Weight: ${pokemon.weight / 10}kg
  `;
    return card;
}
// toast
document.getElementById("copiedToast").addEventListener("click", function () {
    // Hide the custom toast when the close button is clicked
    $("#copiedToast").css("visibility", "hidden");
    $("#copiedToast").addClass("show");
});

// Show the custom toast
document
    .getElementById("showToastButton")
    .addEventListener("click", function () {
        $("#copiedToast").addClass("show");
        // Hide the toast after a delay (e.g., 3 seconds)
        setTimeout(function () {
            $("#copiedToast").removeClass("show");
        }, 2000);
    });
