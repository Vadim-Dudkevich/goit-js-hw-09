import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name = delay]'),
  step: document.querySelector('input[name =step]'),
  amount: document.querySelector('input[name =amount]'),
};

console.log(refs.delay);

console.log(refs.amount.value);

let setID = null;

let DATA = [];

refs.form.addEventListener('input', onCoice);
refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  console.log(`Form Submited`);

  delayBilder(refs.amount, refs.delay, refs.step);

  DATA.forEach((currentValue, index) => {
    console.log(currentValue);
    console.log(index);

    createPromise(index, currentValue).then(onSucsess).catch(onError);
  });

  DATA = [];
  clearTimeout(setID);
}

function onSucsess(result) {
  console.log(result);
  Notiflix.Notify.success(`${result}`);
}

function onError(error) {
  console.log(error);

  Notiflix.Notify.failure(`${error}`);
}

function onCoice(e) {
  refs[e.target.name] = e.target.value;
  console.log(refs);
}

function delayBilder(amount, delay, step) {
  DATA = [];
  for (let i = 0; i < amount; i += 1) {
    delay = Number(delay);
    step = Number(step);

    const total = delay + step * i;

    DATA.push(total);
    console.log(DATA);
  }
}

function createPromise(position, delay) {
  return new Promise((reslove, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const setID = setTimeout(() => {
      if (shouldResolve) {
        reslove(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      }

      reject(`❌ Rejected promise ${position + 1} in ${delay}ms`);
    }, delay);
  });
}
