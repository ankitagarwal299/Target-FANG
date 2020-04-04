const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;

  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Type Method
TypeWriter.prototype.type = function() {
  //current index of word
  const current = this.wordIndex % this.words.length;

  //get the full text of the current word
  const fullTxt = this.words[current];
  console.log(fullTxt);

  //Check if deleting
  if (this.isDeleting) {
    //remove a word
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add a word
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert txt into span element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Type Speed
  /* Deleting faster , inserting slow */

  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed = typeSpeed / 2;
  }

  //checking of the word is matched, next word
  if (!this.isDeleting && this.txt == fullTxt) {
    //make a pause at end
    typeSpeed = this.wait;

    //set delete true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt == "") {
    this.isDeleting = false;

    //move to next word
    this.wordIndex++;

    //Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => {
    this.type();
  }, typeSpeed);
};

//Init on DOM LOAD
document.addEventListener("DOMContentLoaded", init);

//Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  /* init TypeWriter */
  new TypeWriter(txtElement, words, wait);
}
