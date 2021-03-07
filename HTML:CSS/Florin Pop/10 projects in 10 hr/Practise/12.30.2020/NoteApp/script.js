const addNoteEl = document.getElementById('add');

const notesLS = JSON.parse(localStorage.getItem('notes'));
if (notesLS && notesLS?.length) {
    notesLS.forEach((note) => {
        addNote(note);
    });
}


addNoteEl.addEventListener('click', () => {
    addNote();
});

function addNote(text) {
    const note = document.createElement('div');
    note.innerHTML =
        `<div class="notes" id="notes">
            <div class="tools">
                <div class="edit"><i class="fas fa-edit"></i></div>
                <div class="delete"><i class="fas fa-trash"></i></div>
            </div>

            <div class="main">
                <p><small class="hint">Click to edit</small></p>
            </div>
            <textarea class="hidden"></textarea>
        </div>`;

    const container = document.querySelector('.container');
    container.appendChild(note);

    const editBtn = note.querySelector('.edit');
    editBtn.addEventListener('click', () => {
        const main = note.querySelector('.main');
        const textarea = note.querySelector('textarea');

        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    const delBtn = note.querySelector('.delete');
    delBtn.addEventListener("click", () => {
        note.remove();
        updateLS();
    });

    const textarea = note.querySelector('textarea');
    textarea.addEventListener('input', (e) => {
        const main = note.querySelector('.main');
        main.innerHTML = marked(e.target.value);
        //textarea.value = e.target.value;
        updateLS();
    });

    const main = note.querySelector('.main');
    if (text && text?.length) {
        main.innerHTML = marked(text);
        textarea.value = text;
    }
}

function updateLS() {

    const notesEl = document.querySelectorAll('textarea');
    const notes = [];
    notesEl.forEach((note) => {
        if (note && note.value?.length) {
            notes.push(note.value);
        }
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}