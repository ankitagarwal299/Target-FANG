const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year= document.getElementById('year');
const loading= document.getElementById('loading');


const currentYear = new Date().getFullYear();

//set background
year.innerHTML = currentYear +1;

function updateCountdown() {
  const diff = new Date(`January 01 ${currentYear + 1}`) - new Date();
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerText = d;
  hours.innerText = h;
  minutes.innerText = m;
  seconds.innerText = s;
}

/* show spinner before countdown */
setTimeout(()=>{
    loading.remove();
    countdown.style.display = 'flex'
},1000)

setInterval(updateCountdown, 1000);
