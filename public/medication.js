const sectionEl = document.querySelector('.med-grid');

async function fetchData() {
  const res = await fetch('http://localhost:3306/v1/medications');
  const data = await res.json();
  generateAll(data, sectionEl);
}

function generateCard(name, desc, dest) {
  const divEl = document.createElement('div');
  divEl.classList.add('card');
  const h2El = document.createElement('h2');
  h2El.textContent = name;
  const pEl = document.createElement('p');
  pEl.textContent = desc;
  divEl.append(h2El, pEl);
  dest.append(divEl);
}

function generateAll(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((med) => {
    generateCard(med.name, med.description, dest);
  });
}

fetchData();
