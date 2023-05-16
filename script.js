const form = document.getElementById('form');
const text = document.getElementById('textInput');
const offset = document.getElementById('offset');
const skew = document.getElementById('skew');
const colors = document.querySelectorAll('.colorSelect');
const visualizer = document.getElementById('visualizer');
const loadText = document.getElementById('loading');
const woods = document.querySelectorAll('.woodSelect');
const backboardShapes = document.querySelectorAll('.backboardShape');
const data = document.getElementById('data');
const saveOutline = document.getElementById('saveOutline');

const apiEndPoint = 'https://signrenderapi-production.up.railway.app/api/';
// const apiEndPoint = 'http://127.0.0.1:5000/api/';
const values = {
  text: 'Default',
  offset: 20,
  color: '#ffffff',
  wood: 'https://th.bing.com/th/id/OIP.IHewWcp0eR9crdv9XwT_SQHaHa',
};

woods.forEach((button) => {
  button.style.background = `url(${button.value})`;
  button.addEventListener('click', () => {
    values['wood'] = button.value;
    const backboard = document.getElementById('texture').firstChild;
    backboard.setAttribute('xlink:href', values.wood);
  });
});

colors.forEach((button) => {
  button.style.background = `${button.value}`;
  button.addEventListener('click', () => {
    values['color'] = button.value;
    const text = document.getElementById('text');
    text.setAttribute('fill', button.value);
  });
});

backboardShapes.forEach((button) => {
  button.addEventListener('click', () => {
    values['backboardShape'] = button.value;
    getSignRender();
  });
});

[text, offset, skew].forEach((input) => {
  input.addEventListener('change', () => {
    values[input.name] = input.value;
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

  const response = await fetch(apiEndPoint + 'preview/' + query.replace('#', ''));
  const jsonData = await response.json();

  visualizer.innerHTML = jsonData.sign;
  console.timeEnd('Response Time');
  loadText.style.opacity = 0;
};
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  getSignRender();
});

// Function to download data to a file
// updated from : https://stackoverflow.com/a/30832210/17977603
function download(data, filename, type) {
  const file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

saveOutline.addEventListener('click', async (e) => {
  e.preventDefault();
  let query = '?';
  for (const value in values) {
    query += `&${value}=${values[value]}`;
  }
  const response = await fetch(apiEndPoint + 'outline/' + query.replace('#', ''));
  const jsonData = await response.json();
  download(jsonData.sign, `${values.text}-Family-Outline`, 'image/svg+xml');
});

getSignRender();
