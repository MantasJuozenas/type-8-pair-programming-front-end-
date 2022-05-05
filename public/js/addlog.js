let id = location.search.slice(2);
const formEl = document.forms[0];

formEl.elements.petId.value = id;

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formEl.elements.status.value === '' || formEl.elements.description.value === '') {
    alert('blogai ivesti duomenys');
    return;
  }
  const newObj = {
    pets_id: formEl.elements.petId.value,
    status: formEl.elements.status.value,
    description: formEl.elements.description.value,
  };
  formEl.elements.status.value = '';
  formEl.elements.description.value = '';
  postLogs(newObj);
});
async function postLogs(obj) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };
  const res = await fetch('http://localhost:3306/v1/logs', options);
  if (res.ok === true) {
    window.location.href = 'index.html';
  } else {
    console.error('somethin went wrong');
  }
}
