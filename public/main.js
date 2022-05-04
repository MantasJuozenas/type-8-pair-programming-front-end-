async function getPets() {
  const resp = await fetch('http://localhost:3306/v1/pets');
  const petsArr = await resp.json();
  genCards(petsArr, document.body);
}
getPets();

function oneCard(name, data, email, id) {
  const divCardEl = document.createElement('div');
  divCardEl.className = 'cardTitle';
  const h2El = document.createElement('h2');
  h2El.className = 'cardTitle';
  h2El.textContent = name;
  divCardEl.prepend(h2El);
  const pDataEl = document.createElement('p');
  pDataEl.textContent = data;
  h2El.after(pDataEl);
  const pEmailEl = document.createElement('p');
  pEmailEl.textContent = email;
  pDataEl.after(pEmailEl);
  const divBtnEl = document.createElement('div');
  divBtnEl.className = 'buttons';
  pEmailEl.after(divBtnEl);
  const viewBtnEl = document.createElement('button');
  viewBtnEl.className = 'view-log-btn';
  viewBtnEl.textContent = 'VIEW LOG';
  divBtnEl.prepend(viewBtnEl);
  const deleteBtnEl = document.createElement('button');
  deleteBtnEl.textContent = 'DELETE';
  deleteBtnEl.classList = 'delete-btn';
  viewBtnEl.after(deleteBtnEl);

  return divCardEl;
}
function genCards(arr, dest) {
  arr.forEach((obj) => {
    dest.append(oneCard(obj.name, obj.dob, obj.client_email, obj.id));
  });
}

/* <div class="card">

<h2 class="cardTitle">Levis</h2>

<p>2001-12-25</p>

<p>petras@petras.lt</p>

<div class="buttons">

<button class="view-log-btn">VIEW LOG</button>

<button class="delete-btn">DELETE</button>

</div>

</div> */
