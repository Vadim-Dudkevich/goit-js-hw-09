import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timer: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let thisID = null;

refs.btn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (Date.parse(selectedDates[0]) > Date.now()) {
      refs.btn.removeAttribute('disabled');

      let delayTime = Date.parse(selectedDates[0]) - Date.now();

      const delayTimeObj = convertMs(delayTime);

      refs.days.textContent = `${pad(delayTimeObj.days)}`;
      refs.hours.textContent = `${pad(delayTimeObj.hours)}`;
      refs.minutes.textContent = `${pad(delayTimeObj.minutes)}`;
      refs.seconds.textContent = `${pad(delayTimeObj.seconds)}`;

      clearInterval(thisID);
    } else {
      Notiflix.Notify.warning('Please choose a date in the future!\nВедите более позднюю дату!');
      //   alert('Please choose a date in the future!\nВедите более позднюю дату!');
    }
  },
};

const dateEnjoer = flatpickr(refs.timer, options);

refs.btn.addEventListener('click', start);

function start() {
  const startTime = Date.parse(dateEnjoer.selectedDates[0]);

  refs.btn.setAttribute('disabled', true);

  thisID = setInterval(() => {
    const currentTime = Date.now();

    let delayTime = startTime - currentTime;

    Notiflix.Notify.info('Countdown started'); //!==============================

    const delayTimeObj = convertMs(delayTime);

    refs.days.textContent = `${pad(delayTimeObj.days)}`;
    refs.hours.textContent = `${pad(delayTimeObj.hours)}`;
    refs.minutes.textContent = `${pad(delayTimeObj.minutes)}`;
    refs.seconds.textContent = `${pad(delayTimeObj.seconds)}`;

    if (Math.round(delayTime / 1000) === 0) {
      Notiflix.Report.success('🤠 Count off!');
      console.log('Отсчет окончен');
      clearInterval(thisID);
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad(value) {
  return String(value).padStart(2, '0');
}
