const form = document.querySelector('#form');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const target = event.target;
  const formData = new FormData(event.target);
  const payload = getPayload(formData);
  sendFormData(target.action, payload);
}

function sendFormData(url, payload) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

function getPayload(formData) {
  const data = {};

  for (let [key, value] of formData) {
    switch(key) {
      case 'names':
        data[key] = data[key] || [];
        data[key].push(value);
        break
      case 'message':
        data[key] = value;
        break
    }
  }

  return data
}
