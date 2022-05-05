const formEl = document.forms[0];

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formEl.elements.name.value === '' || formEl.elements.description.value === '') {
    alert('neivesti duomenys');
    return;
  }
  const newObj = {
    name: formEl.elements.name.value.trim(),
    description: formEl.elements.description.value.trim(),
  };
  formEl.elements.name.value = '';
  formEl.elements.description.value = '';
  postingMed(newObj);
});

async function postingMed(obj) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };
  const res = await fetch(' http://localhost:3306/v1/medications', options);
  if (res.ok === true) {
    window.location.href = 'medication.html';
  } else {
    alert('somethin went wrong');
  }
}
