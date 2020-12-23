
const addBtn = document.getElementById('add');

/* Retrieve from LS */
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}


addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
     <div class="notes">
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i> </button>
            <button class="delete"> <i class="fas fa-trash-alt"></i></button>
        </div>
        <div>
            <div class="main ${text ? "" : "hidden"}">
            <em>please click to edit</em>
            </div>
            <textarea  class="${text ? "hidden" : ""}"></textarea>
        </div>
    </div>
    `;

    document.body.appendChild(note);
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');


    /* for LS insert*/
    if (text?.length) {
        textArea.value = text;
        main.innerHTML = marked(text);
    }

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });


    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS()
    });


    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });
}


function updateLS() {
    const notesEL = document.querySelectorAll('textarea');

    const notes = [];

    notesEL.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));

}


