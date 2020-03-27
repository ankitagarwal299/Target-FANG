var countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

var timer = function(seconds) {
    //clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.floor((then - Date.now()) / 1000);

    /* not stopping interval ; just returing but in background it is running */
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? "0" + minutes : minutes}:
  ${remainderSeconds < 10 ? "0" + remainderSeconds : remainderSeconds}`;
  timerDisplay.innerHTML = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();

  endTime.textContent = `Be back at ${adjustedHour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(function(button) {
  button.addEventListener("click", startTimer);
});

document.customForm.addEventListener('submit',function (e){
    e.preventDefault();

    const mins = this.minutes.value;
    timer(mins*60)
    this.reset();
})