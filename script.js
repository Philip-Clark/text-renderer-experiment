const form = document.getElementById('form');
const text = document.getElementById('text');
const offset = document.getElementById('offset');
const color = document.getElementById('color');
const wood = document.getElementById('wood');
const visualizer = document.getElementById('visualizer');

const apiEndPoint = 'http://192.168.1.85:5000/api/preview/';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let values = '?';
  [text, offset, color, wood].forEach((input) => {
    if (input.value === '') return;
    values = values + `${input.id}=${input.value.replace('#', '')}&`;
  });

  const response = await fetch(apiEndPoint + values);
  const jsonData = await response.json();

  visualizer.innerHTML = jsonData.sign;
});
