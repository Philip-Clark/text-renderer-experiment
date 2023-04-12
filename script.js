const text = 'Howdy';
const textElements = document.getElementsByClassName('text');
const woods = document.getElementsByClassName('woodSelect');

const input = document.getElementById('name');

[...woods].forEach((element) => {
  element.style = `background-image: url(${element.value})`;
  element.addEventListener('click', (button) => {
    document.getElementById('material').setAttribute('xlink:href', `${element.value}`);
    [...stains].forEach((element) => {
      element.style = `background: url('${element.value}')`;
    });
  });
});

input.addEventListener('change', (e) => {
  [...textElements].forEach((element) => {
    element.innerHTML = `<tspan x="48%" dy="0">The</tspan>
    <tspan x="50%" dy="1.2em">${e.target.value}</tspan>
    <tspan x="51%" dy="1.2em">Family</tspan>`;
    console.log(e.target);
  });
});
