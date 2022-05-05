let id = location.search.slice(2);
const formEl = document.forms[0];

formEl.elements.petId.value = id;

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formEl.elements.medId.value === '' || formEl.elements.comment.value === '') {
    alert('blogai ivesti duomenys');
    return;
  }
  const newObj = {
    pet_id: formEl.elements.petId.value,
    medication_id: formEl.elements.medId.value,
    comment: formEl.elements.comment.value,
  };
  formEl.elements.medId.value = '';
  formEl.elements.comment.value = '';
  postPresc(newObj);
});
async function postPresc(obj) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };
  const res = await fetch('http://localhost:3306/v1/prescriptions', options);
  if (res.ok === true) {
    window.location.href = 'index.html';
  } else {
    console.error('somethin went wrong');
  }
}

async function getMedications() {
  const res = await fetch('http://localhost:3306/v1/medications');
  const data = await res.json();
  genSelectOpt(data);
}

function genSelectOpt(arr) {
  arr.forEach((obj) => {
    const optEl = document.createElement('option');
    optEl.value = obj.id;
    optEl.textContent = obj.name;
    formEl.elements.medId.append(optEl);
  });
}

getMedications();
