const formElement = document.getElementById('form');

const handleSubmit = e => {
  e.preventDefault();
  const name = e.target.name.value;

  const data = { name: name };

  fetch('http://127.0.0.1:3000', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data));
};

formElement.addEventListener('submit', handleSubmit);
