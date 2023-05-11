const form = document.getElementById('form');
const text = document.getElementById('text');
const offset = document.getElementById('offset');
const color = document.getElementById('color');
const visualizer = document.getElementById('visualizer');
const loadText = document.getElementById('loading');

const woods = document.querySelectorAll('.woodSelect');

woods.forEach((button) => {
  button.style.background = `url(${button.value})`;
  button.addEventListener('click', () => {
    values['wood'] = button.value;
    getSignRender();
  });
});

const apiEndPoint = 'https://signrenderapi-production.up.railway.app/api/preview/';
// const apiEndPoint = 'http://192.168.1.85:5000/api/preview';

const values = {
  text: 'Default',
  offset: 20,
  color: '#bf2020',
  wood: 'https://th.bing.com/th/id/OIP.IHewWcp0eR9crdv9XwT_SQHaHa',
};

[text, offset, color].forEach((input) => {
  input.addEventListener('change', () => {
    values[input.id] = input.value;
    getSignRender();
  });
});
const getSignRender = async () => {
  loadText.style.opacity = 1;

  console.time('Response Time');

  let query = '?';
  for (const value in values) {
    query += `&${value}=${values[value]}`;
  }

  console.log(query);

  const response = await fetch(apiEndPoint + query.replace('#', ''));
  const jsonData = await response.json();

  visualizer.innerHTML = jsonData.sign;
  console.timeEnd('Response Time');
  loadText.style.opacity = 0;
};
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  getSignRender();
});

getSignRender();
