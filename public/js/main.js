const sectionEl = document.querySelector('.grid');

async function getPets() {
  const resp = await fetch('http://localhost:3306/v1/pets');
  const petsArr = await resp.json();
  genCards(petsArr, sectionEl);
}

function oneCard(name, data, email, id) {
  const divCardEl = document.createElement('div');
  divCardEl.className = 'card';
  const h2El = document.createElement('h2');
  h2El.className = 'cardTitle';
  h2El.textContent = name;
  divCardEl.prepend(h2El);
  const pDataEl = document.createElement('p');
  pDataEl.textContent = data.slice(0, 10);
  h2El.after(pDataEl);
  const pEmailEl = document.createElement('p');
  pEmailEl.textContent = email;
  pDataEl.after(pEmailEl);
  const divBtnEl = document.createElement('div');
  divBtnEl.className = 'buttons';
  pEmailEl.after(divBtnEl);
  const viewBtnEl = document.createElement('button');
  viewBtnEl.addEventListener('click', () => {
    window.location.href = `log.html?=${id}`;
  });
  viewBtnEl.className = 'view-log-btn';
  viewBtnEl.textContent = 'VIEW LOG';

  divBtnEl.prepend(viewBtnEl);
  const deleteBtnEl = document.createElement('button');
  deleteBtnEl.addEventListener('click', () => {
    if (confirm(`Ar tikrai norite istrint ${name}`) === true) {
      deletingPet(id);
      getPets();
    }
    return;
  });
  deleteBtnEl.textContent = 'DELETE';
  deleteBtnEl.classList = 'delete-btn';
  viewBtnEl.after(deleteBtnEl);

  return divCardEl;
}
function genCards(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((obj) => {
    dest.append(oneCard(obj.name, obj.dob, obj.client_email, obj.id));
  });
}

async function deletingPet(id) {
  const resp = await fetch(`http://localhost:3306/v1/pets/${id}`, { method: 'DELETE' });
  const data = await resp.json();
  if (data.success === true) {
    getPets();
  }
}

getPets();
