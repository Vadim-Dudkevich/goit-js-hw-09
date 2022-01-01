const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let randomiserID = null;
refs.btnStop.setAttribute('disabled', true);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
refs.btnStart.addEventListener('click', colorRandomerStart);
function colorRandomerStart() {
  refs.btnStart.setAttribute('disabled', true);
  refs.btnStop.removeAttribute('disabled');

  randomiserID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
refs.btnStop.addEventListener('click', colorRandomerStop);
function colorRandomerStop() {
  clearInterval(randomiserID);
  refs.btnStart.removeAttribute('disabled');
  refs.btnStop.setAttribute('disabled', true);
}
