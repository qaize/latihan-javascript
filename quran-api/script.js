const urlAllSurah = "https://quran-api.santrikoding.com/api/surah";
const mainBody = document.getElementById("main-body");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let partialSurah = [];
let allDataSurahPromise = null;
let isDataLoaded = false;

const offset = 9;
let page = 1;
let currentIndex = 0;
let totalData = page * offset;

function Surah(nomor, nama_latin, arti) {
  this.nomor = nomor;
  this.nama_latin = nama_latin;
  this.arti = arti;
}

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    currentIndex = currentIndex - offset;
  }
  // loadAllSurah(currentIndex, page * offset);
  loadPagingSurah(currentIndex, page * offset);
});

nextButton.addEventListener("click", () => {
  page++;
  currentIndex = currentIndex + offset;
  // loadAllSurah(currentIndex, page * offset);
  loadPagingSurah(currentIndex, page * offset);
});

function loadAllSurah() {
  if (!isDataLoaded) {
    allDataSurahPromise = new Promise((resolve, reject) => {
      const allDataSurah = new Array();
      const dataError = "not found";
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
          const responses = JSON.parse(xhttp.responseText);

          responses.forEach((element) => {
            allDataSurah.push(
              new Surah(element.nomor, element.nama_latin, element.arti)
            );
          });
          isDataLoaded = true;
          resolve(allDataSurah);
          reject(dataError);
        }
      };
      xhttp.open("GET", urlAllSurah);
      xhttp.send();
    });
  }
  return allDataSurahPromise;
}

function loadPagingSurah(currentIndex, totalData) {
  loadAllSurah().then((allData) => {
    mainBody.innerHTML = "";
    for (currentIndex - 1; currentIndex < totalData; currentIndex++) {
      mainBody.appendChild(surahCard(allData[currentIndex]));
    }
  });
}

function surahCard(surah) {
  const card = document.createElement("div");
  card.classList.add("surah-card");

  card.innerHTML = `
  <p>${surah.nomor}</p>
  <div>
  <h2>${surah.nama_latin}</h2>
  <h4>${surah.arti}</h4>
  </div>
  <button>Read</button>  
  `;

  return card;
}

loadPagingSurah(currentIndex, totalData);

// console.log(allSurah);
