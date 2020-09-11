
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];


function addItem(e) {
    e.preventDefault();
    let text = this.querySelector('[name=item]').value;

    const item = { text: text, 'done': false }

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

function populateList(plates = [], plateList) {

    plateList.innerHTML = plates.map((plate, index) => {
        return `
    <li>
        <input type='checkbox' id='item${index}' data-index=${index} ${plate.done ? 'checked':''} >
        <label for="item${index}">${plate.text}</label>
    </li>
    `;
    }).join('');
}

populateList(items, itemsList);

function toggleDone(e) {
    if (!e.target.matches('input')) return; //skip if not input element

    console.log(e.target.dataset.index);
    items[e.target.dataset.index].done = !items[e.target.dataset.index].done;

    localStorage.setItem('items', JSON.stringify(items));
    //populateList

}



addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);