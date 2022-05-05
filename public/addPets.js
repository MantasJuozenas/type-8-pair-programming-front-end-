const btnSubmitEl = document.getElementById('btnSubmit');

btnSubmitEl.addEventListener('click', (e) => {
  e.preventDefault();
  const newPet = {
    name: document.forms[0].elements.name.value,
    dob: document.forms[0].elements.data.value,
    client_email: document.forms[0].elements.email.value,
  };
  document.forms[0].elements.name.value = '';
  document.forms[0].elements.data.value = '';
  document.forms[0].elements.email.value = '';

  postingPets(newPet);
});

async function postingPets(obj) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(obj),
  };
  const res = await fetch('http://localhost:3306/v1/pets', options);
  console.log('res ===', res);
  if (res.ok === true) {
    window.location.href = 'addPets.html';
  } else {
    console.error('somethin went wrong');
  }
}
