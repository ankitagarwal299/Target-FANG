// window.addEventListener('keydown', function (e) {
//     //select audio element
//     let audio = document.querySelector("audio[data-key='" + e.keyCode + "']");    /* ES6 way     let audio = document.querySelector(`audio[data-key= "${e.keyCode}"]`) */

//     //select div element
//     let divElement = document.querySelector("div[data-key='" + e.keyCode + "']");
//     divElement.classList.add('playing');


//     audio.play();
//     audio.currentTime = 0;


   
// })
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);