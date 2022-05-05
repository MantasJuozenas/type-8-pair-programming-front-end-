const sectionGridEl = document.querySelector('.grid');
const h1El = document.querySelector('h1');
let id = location.search.slice(2);
const displayLogsBtn = document.getElementById('displayLogs');
const displayPrescBtn = document.getElementById('displayPresc');
const prescBtnEl = document.querySelector('.presc-btn');
const logbtnEl = document.querySelector('.log-btn');

prescBtnEl.addEventListener('click', () => {
  window.location.href = `addPrescripcion.html?=${id}`;
});

displayLogsBtn.addEventListener('click', () => {
  displayLogsBtn.classList.toggle('active');
  displayLogsBtn.classList.contains('active') ? check() : check();
});

displayPrescBtn.addEventListener('click', () => {
  displayPrescBtn.classList.toggle('active');
  displayPrescBtn.classList.contains('active') ? check() : check();
});

function createOneCard(med_name, description, data) {
  const divCardEl = document.createElement('div');
  divCardEl.className = 'card';
  const h2El = document.createElement('h2');
  h2El.className = 'cardTitle';
  h2El.textContent = med_name;
  const pDescrEl = document.createElement('p');
  pDescrEl.textContent = description;
  const pData = document.createElement('p');
  pData.textContent = data.slice(0, 10);
  divCardEl.append(h2El, pDescrEl, pData);
  return divCardEl;
}
function createOneCardLog(med_name, description, data) {
  const divCardEl = document.createElement('div');
  divCardEl.className = 'card';
  const h2El = document.createElement('h2');
  h2El.className = 'cardTitle';
  h2El.textContent = med_name;
  const pDescrEl = document.createElement('p');
  pDescrEl.textContent = description;
  const pData = document.createElement('p');
  pData.textContent = data;
  divCardEl.append(h2El, pDescrEl, pData);
  return divCardEl;
}

function genCardsPrescriptions(arr, dest) {
  arr.forEach((obj) => {
    dest.append(createOneCard(obj.medication_name, obj.description, obj.dob));
    h1El.textContent = `${obj.name}: Health Records`;
  });
}

function genCardsLogs(arr, dest) {
  arr.forEach((obj) => {
    dest.append(createOneCardLog(obj.name, obj.status, obj.client_email));
    h1El.textContent = `${obj.name}: Health Records`;
  });
}

async function getingPrescription(id) {
  const res = await fetch(`http://localhost:3306/v1/prescriptions/${id}`);
  const data = await res.json();

  genCardsPrescriptions(data, sectionGridEl);
}

async function getingLogs(id) {
  const res = await fetch(`http://localhost:3306/v1/logs/${id}`);
  const data = await res.json();

  genCardsLogs(data, sectionGridEl);
}
function check() {
  if (displayLogsBtn.classList.contains('active') && displayPrescBtn.classList.contains('active')) {
    sectionGridEl.innerHTML = '';
    getingPrescription(id.slice(2));
    getingLogs(id.slice(2));
  } else {
    sectionGridEl.innerHTML = '';
    if (displayPrescBtn.classList.contains('active')) {
      getingPrescription(id.slice(2));
    }
    if (displayLogsBtn.classList.contains('active')) {
      getingLogs(id.slice(2));
    }
    return;
  }
}

getingPrescription(id);
getingLogs(id);
