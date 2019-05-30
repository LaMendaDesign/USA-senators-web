/*

//Members
let members = data.results[0].members;

//Table from HTML
let tbody = document.getElementById("miTabla");

//Listeners
document.getElementById("rep").addEventListener("change", sayHello);
document.getElementById("dem").addEventListener("change", sayHello);
document.getElementById("ind").addEventListener("change", sayHello);

//We need to execute this function to see the first table
printTable();

// Function to print the table
function printTable() {
  let template = "";

  members.forEach(function (member) {
    template += `
  <tr>
      <td><a href="${member.url}">${member.first_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>
    </tr>`;
  });

  tbody.innerHTML = template;
}

//Function executed when the cb are clicked
function sayHello() {
  let repCb = document.getElementById("rep");
  let demCb = document.getElementById("dem");
  let indCb = document.getElementById("ind");
  let checkeados = [];

  if (repCb.checked) {
    checkeados.push("R");
  }

  if (demCb.checked) {
    checkeados.push("D");
  }

  if (indCb.checked) {
    checkeados.push("I");
  }

  if (!repCb.checked && !demCb.checked && !indCb.checked) {
    checkeados.push("R");
    checkeados.push("D");
    checkeados.push("I");
  }

  let membersToPrint = [];

  members.forEach(function (member) {
    if (checkeados.includes(member.party)) {
      membersToPrint.push(member);
    }
  });

  console.log(membersToPrint);

  printNewTable(membersToPrint);
}

//Function that prints the new members
function printNewTable(miembrosAImprimir) {
  let template = "";

  miembrosAImprimir.forEach(function (member) {
    template += `
  <tr>
      <td><a href="${member.url}">${member.first_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>
    </tr>`;
  });

  tbody.innerHTML = template;
}*/

// busqueda recursiva de los estados de cada miembro y meterlo en array. push
// hacer un array en la que solo haya un elemento, que es el estado al que eprtenece
// para hacer un nuevo array que sea de elementos unicos, hacer [...new Set()]
// mostrar por html las opciones. hacer un template de option.


let myVue = new Vue({ // crear objeto view
  el: "#miTabla", //el value es donde va a trabajar view dentro del html
  data: {  //aqui es donde van las variables
    members: [],
    checkboxes: [],
    stateSelected: "all"
  },
  methods: { //aqui es donde se declaran las funciones
    getData() {
      fetch("https://nytimes-ubiqum.herokuapp.com/congress/113/senate")
        .then(function (pan) { //pan es un nombre inventado para el parametro
          return pan.json();
        })
        .then(function (data) {
          myVue.members = data.results[0].members;
        });
    }
  },
  computed: {  //esto esta pendiente de si una variable cambia. Es una mezcla de una funcion y una variable. Esta variable se ejecuta cuando algo cambia dentro de ella. COMPUTED es muy importante en VUE
    filteredMembers() {
      return this.members.filter(member => {
        let filtro1 =
          this.checkboxes.includes(member.party) ||
          this.checkboxes.length == 0;
        let filtro2 =
          this.stateSelected == member.state ||
          this.stateSelected == "all";
        return filtro1 && filtro2;
      });
    },
    states() {
      return new Set(this.members.map(member => member.state).sort());
    }

  },
  created() { //es un metodo predefinido por vue. Cuando se cree este objeto vue ejecuta la funcion .getData
    this.getData();
  }
});

console.log("dasd")
