const charachterChanger = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

class Person {
  constructor(name, email, noHp) {
    this.name = name;
    this.email = email;
    this.noHp = noHp;
  }
}

const personList = new Array(
  new Person("Dummy1 satu", "dummysatu@indocyber.id", "08182892XXX"),
  new Person("Dummy2 dua", "dummydua@indocyber.id", "08180842XXX"),
  new Person("Dummy3 tiga", "dummytiga@indocyber.id", "28180892XXX"),
  new Person("Dummy4 empat", "dummyempat@gmail.com", "04180892XXX"),
  new Person("Dummy5 lima", "dummylima@gmail.com", "18180192XXX")
);

//   SOal nomor 0
console.log(personList);

// soal nomor 1
personList.push(
  new Person("Dummy6 enam", "dummyenam@gmail.com", "08180892XXX")
);
console.log(personList);

// Soal nomor 2
console.log(personList.length);

// Soal nomor 3
personList.forEach((element) => {
  console.log(element.name.split(" ")[0]);
});

// nomor 4
personList.forEach((element) => {
  if (element.email.includes("indocyber")) {
    console.log(element.name);
    console.log(element.email);
  }
});

// nomor 5,6,7

let newEditedPerson = new Array();

personList.forEach((element) => {
  let noHp = element.noHp.replace("XXX", "000");
  let noHpInChar = noHp.split("");
  let editedNoHp = new Array();

  let penjumlahanNomorGenap = 0;

  noHpInChar.forEach((no) => {
    if (no == 0) {
      editedNoHp.push(charachterChanger[0]);
    }
    if (no == 1) {
      editedNoHp.push(charachterChanger[1]);
    }
    if (no == 2) {
      editedNoHp.push(charachterChanger[2]);
    }
    if (no == 3) {
      editedNoHp.push(charachterChanger[3]);
    }
    if (no == 4) {
      editedNoHp.push(charachterChanger[4]);
    }
    if (no == 5) {
      editedNoHp.push(charachterChanger[5]);
    }
    if (no == 6) {
      editedNoHp.push(charachterChanger[6]);
    }
    if (no == 7) {
      editedNoHp.push(charachterChanger[7]);
    }
    if (no == 8) {
      editedNoHp.push(charachterChanger[8]);
    }
    if (no == 9) {
      editedNoHp.push(charachterChanger[9]);
    }

    if (no % 2 == 0) {
      penjumlahanNomorGenap = penjumlahanNomorGenap + parseInt(no);
    }
  });
  let finalNoHp = "";
  let counter = 0;
  editedNoHp.forEach((element) => {
    finalNoHp = finalNoHp + element;
    if (element == "C") {
      counter++;
    }
  });

  console.log(
    `${finalNoHp} Total C = ${
      counter != 0 ? counter : "Tidak ada C"
    } Penjumlahan No Genap =${penjumlahanNomorGenap}`
  );
});
