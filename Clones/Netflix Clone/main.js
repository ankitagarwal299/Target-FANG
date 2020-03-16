const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems =document.querySelectorAll('.tab-content-item');

//Select tab item
function selectItem(e){
    removeBorder();
    removeShow();

    //Add border to current tab
    this.classList.add('tab-border');

    //Grab content item from DOM
    const tabContentItem = document.querySelector(`#${this.id}-content`);
    tabContentItem.classList.add('show');
}

function removeBorder(){
    tabItems.forEach(function (item){
        item.classList.remove('tab-border');
    })
}

function removeShow(){
    tabContentItems.forEach(function (item){
        item.classList.remove('show');
    })
}

//Listen for tab click
tabItems.forEach(function (item){
    item.addEventListener('click',selectItem);
});


