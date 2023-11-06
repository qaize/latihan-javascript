const urlAllSurah = "https://quran-api.santrikoding.com/api/surah";
const mainBody = document.getElementById("main-body");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pagination = document.getElementById("pagination");

let partialSurah = [];
let allDataSurahPromise = null;
let isDataLoaded = false;
let searchSurah = "";

const offset = 18;
let page = 1;
let totalPage = 0;
let currentIndex = 0;
let overflow = 0;
let totalData = page * offset;

function Surah(nomor, nama_latin, arti) {
  this.nomor = nomor;
  this.nama_latin = nama_latin;
  this.arti = arti;
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchSurah = searchInput.value;
    isDataLoaded = false;
    loadPagingSurah(currentIndex, page * offset);
  }
});

searchButton.addEventListener("click", () => {
  searchSurah = searchInput.value;
  isDataLoaded = false;
  loadPagingSurah(currentIndex, page * offset);
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    currentIndex = currentIndex - offset;
  }
  // loadAllSurah(currentIndex, page * offset);
  loadPagingSurah(currentIndex, page * offset);
});

nextButton.addEventListener("click", () => {
  if (totalPage > page) {
    page++;
    currentIndex = currentIndex + offset;
    // loadAllSurah(currentIndex, page * offset);
    loadPagingSurah(currentIndex, page * offset);
  }
  // perform last page
  if (totalPage == page) {
    loadPagingSurah(currentIndex, currentIndex + overflow);
  }
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

          // Filter
          responses.forEach((element) => {
            let searchNamaSurah = element.nama_latin.toLowerCase();
            let searchArtiSurah = element.arti.toLowerCase();
            let searchNomor = element.nomor;
            if (
              searchNamaSurah.includes(searchSurah.toLowerCase()) ||
              searchArtiSurah.includes(searchSurah.toLowerCase()) ||
              searchNomor == searchSurah
            ) {
              allDataSurah.push(
                new Surah(element.nomor, element.nama_latin, element.arti)
              );
            }
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
  loadAllSurah()
    .then((allData) => {
      // Initiate Data
      mainBody.innerHTML = "";
      const data = allData;
      totalPage = Math.ceil(data.length / offset);
      overflow = data.length % offset;

      // Pagination state
      if (totalPage > 1) {
        pagination.style.display = "block";
      } else {
        pagination.style.display = "none";
      }

      if (totalPage == page) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "inline-block";
      }

      if (page > 1) {
        prevButton.style.display = "inline-block";
      } else {
        prevButton.style.display = "none";
      }

      // Show Data
      for (currentIndex - 1; currentIndex < totalData; currentIndex++) {
        if (typeof data[currentIndex] === "undefined") {
          break;
        }
        mainBody.appendChild(surahCard(data[currentIndex]));
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function surahCard(surah) {
  const card = document.createElement("div");
  card.classList.add("surah-card");

  card.innerHTML = `
  <p>${surah.nomor}</p>
  <div class="title">
  <h3>${surah.nama_latin}</h3>
  <p>${surah.arti}</p>
  </div>
  <button class="buttons">Read</button>  
  `;

  return card;
}

loadPagingSurah(currentIndex, totalData);
