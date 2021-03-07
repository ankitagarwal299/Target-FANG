const addButton = document.querySelector('.addNew');

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes && notes.length) {
    notes.forEach((note) => {
        addNew(note);
    })
}

addButton.addEventListener('click', function (e) {
    addNew();
})

function addNew(text) {
    const note = document.createElement('div');
    note.innerHTML =
        `
     <div class="note">
            <div class="tools">
                <i  class="fas fa-pencil-alt edit"></i>
                <i class="fas fa-trash delete"></i>
            </div>
            <div class="main"></div>
            <textarea class="hidden"></textarea>
        </div>
    `;
    const container = document.querySelector('.container');
    container.appendChild(note);

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    textarea.addEventListener('input', function (e) {

        main.innerHTML = marked(e.target.value);
        textarea.value = e.target.value;
        updateLS();
    });

    if (text?.length) {
        main.innerHTML = marked(text);
        textarea.value = text;

    }


}

function updateLS() {
    const textArea = document.querySelectorAll('textArea');
    const notes = [];
    textArea.forEach(function (note) {
        if (note.value?.length) {
            notes.push(note.value);
        }
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}