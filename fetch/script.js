const getFetch = document.getElementById("fetch");
const getAjax = document.getElementById("ajax");

function loadFetch() {
  fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
}

function loadAjax() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status === 200) {
      const responses = JSON.parse(xhttp.responseText);
      console.log(responses);
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/ditto");
  xhttp.send();
}

getAjax.onclick = () => {
  loadAjax();
};

getFetch.onclick = () => {
  loadFetch();
};
