const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
    addNewNote();
});

/* retrieve LS deserailize*/
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

function addNewNote(text) {
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');

    noteEl.innerHTML = `
    
            <div class="tools">
                <div class="btn-edit" id="editBtn"><i class="far fa-edit"></i></div>
                <div class="btn-delete" id="delBtn"><i class="far fa-trash-alt"></i></div>
            </div>

            <div class="main">
                <small class="hint">Click to edit</small>
            </div>
            <textarea class="hidden"></textarea>
       
    `;

    const container = document.querySelector('.container');
    container.appendChild(noteEl);

    const textArea = noteEl.querySelector('textarea');
    const main = noteEl.querySelector('.main');


    /* update LS insert */
    if (text?.length) {
        textArea.value = text;
        main.innerHTML = marked(text);
    }

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    const editBtn = noteEl.querySelector('.btn-edit');
    editBtn.addEventListener('click', () => {
        //toggle textarea and main
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });



    const delBtn = noteEl.querySelector('.btn-delete');
    delBtn.addEventListener('click', () => {
        noteEl.remove();
        updateLS()
    });



}

function updateLS() {
    const notesArr = [];

    const notes = document.querySelectorAll('textarea');
    notes.forEach((note) => {
        if (note.value?.length) {
            notesArr.push(note.value);
        }
    });

    localStorage.setItem('notes', JSON.stringify(notesArr));
}
