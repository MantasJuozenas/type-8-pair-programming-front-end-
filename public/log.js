const sectionGridEl = document.querySelector('.grid');
const h1El = document.querySelector('h1');
let id = location.search;
console.log('id ===', id.slice(2));
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

function genCards(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((obj) => {
    dest.append(createOneCard(obj.medication_name, obj.description, obj.dob));
    h1El.textContent = `${obj.name}: Health Records`;
  });
}

async function getingPrescription(id) {
  console.log('id ===', id);
  const res = await fetch(`http://localhost:3306/v1/prescriptions/${id}`);
  console.log('res ===', res);
  const data = await res.json();
  console.log('data ===', data);
  genCards(data, sectionGridEl);
}
getingPrescription(id.slice(2));
