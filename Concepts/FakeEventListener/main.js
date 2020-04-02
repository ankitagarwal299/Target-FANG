const button = document.querySelector('#button');

/* Creating own eventListener */
const fakeEventListener = (event, callback) => {
  const eventObject = {
    type: "click",
    data: {
      target: {
        innerHTML: "Please click me ..."
      }
    },
    url: "localHost"
  };

  if (event === eventObject.type){
      callback(eventObject);
  }
};
 
fakeEventListener('click',function (obj){

    setTimeout(() => {
        button.innerHTML = "changed!!!"
    }, 3000);

})
