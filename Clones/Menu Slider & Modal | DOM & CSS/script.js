const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

//toggle
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});


//show modal
open.addEventListener('click',(e)=>{
    modal.classList.add('show-modal');
})

//hide modal
close.addEventListener('click',()=> modal.classList.remove('show-modal'))