const loadButton = document.getElementById("load-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const collapseButton = document.getElementById("collapse-button");
const pokemonList = document.getElementById("pokemon-data");
const intialData = document.getElementById("initial-data");
const title = document.getElementById("title");

title.innerHTML = "Pokemon";

const limit = 8;
let offset = 0;
let isLoaded = false;

collapseButton.addEventListener("click", () => {
  pokemonList.style.display = "none";
  intialData.style.display = "flex";

  loadButton.style.display = "inline-block";
  isLoaded = false;
});

// loadButton.addEventListener("click", () => {
//   if (!isLoaded) {
//     pokemonList.style.display = "flex";
//     pokemonList.className = "pokemon-list";
//     intialData.style.display = "none";
//     isLoaded = true;
//     loadDoc();
//   }
// });

prevButton.addEventListener("click", () => {
  if (offset > limit && isLoaded) {
    offset -= limit;

    loadDoc();
  }
});

nextButton.addEventListener("click", () => {
  if (isLoaded) {
    offset += limit;
    loadDoc();
  }
});

function loadDoc() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  $.ajax({
    url: url,
    success: function (data) {
      console.log(data);
      pokemonList.style.display = "flex";
      pokemonList.innerHTML = "";
      $.each(data.results, function (key, value) {
        fetchPokemonDetail(value.url);
      });
    },
  });
}

function fetchPokemonDetail(url) {
  $.ajax({
    url: url,
    success: function (detail) {
      console.log(detail);
      const pokemon = pokemonCard(detail);
      pokemonList.appendChild(pokemon);
    },
  });
}

function pokemonCard(pokemon) {
  const card = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML = `
 <h1>${pokemon.name}</h1>
 <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
 <p>Height : ${pokemon.height}</p>
 <p>Weight : ${pokemon.weight}</p>
 `;

  return card;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

const yesLoad = document.getElementById("yes-load");
const noLoad = document.getElementById("no-load");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
loadButton.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

yesLoad.onclick = () => {
  if (!isLoaded) {
    pokemonList.style.display = "flex";
    pokemonList.className = "pokemon-list";
    intialData.style.display = "none";
    loadButton.style.display = "none";
    isLoaded = true;
    loadDoc();
  }
  modal.style.display = "none";
};

noLoad.onclick = () => {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
