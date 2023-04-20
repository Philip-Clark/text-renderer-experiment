const text = 'Howdy';
const textElements = document.getElementsByClassName('text');
const woods = document.getElementsByClassName('woodSelect');
const fonts = document.getElementsByClassName('fontSelect');
const input = document.getElementById('name');
const backWidth = document.getElementById('backWidth');
const fontColor = document.getElementById('color');

const color = '#fff';
const cameraAngle = { x: 1, y: 1 };

[...woods].forEach((element) => {
  element.style = `background-image: url(${element.value})`;
  element.addEventListener('click', (button) => {
    document.getElementById('material').setAttribute('xlink:href', `${element.value}`);
  });
});

[...fonts].forEach((element) => {
  element.addEventListener('click', (button) => {
    document.getElementById('words').setAttribute('font-family', button.target.value);
    document.getElementById('wood').setAttribute('font-family', button.target.value);
    console.log(button.target.value);
  });
});

input.addEventListener('input', (e) => {
  [...textElements].forEach((element) => {
    element.innerHTML = `<tspan x="45%" dy="-1em">The</tspan>
    <tspan x="50%" dy="0.9em">${e.target.value}</tspan>
    <tspan x="55%" dy="0.9em">Family</tspan>`;
    console.log(e.target);
  });
});

backWidth.addEventListener('input', (e) => {
  document.getElementById('wood').setAttribute('stroke-width', `${e.target.value / 10}em`);
});
