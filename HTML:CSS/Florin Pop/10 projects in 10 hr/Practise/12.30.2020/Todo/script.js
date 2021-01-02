const todoForm = document.getElementById("todo-form");
const input = document.getElementById('input-field');
const todoLists = document.getElementById('todo-list');

/* Retrive from LS */
const todos = JSON.parse(localStorage.getItem('tasks'));
if (todos && todos.length) {
    todoLists.innerHTML = '';

    todos.forEach((task) => {
        addTodo(task);
    })
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value?.length) return;

    const json = {
        value: input.value,
        completed: false
    }

    addTodo(json);
});

function addTodo(task) {
    const li = document.createElement('li');
    li.innerHTML = task.value;

    if (task.completed) {
        li.classList.add('completed');
    }

    li.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        li.remove();
        updateLS();
    });

    li.addEventListener('click', (e) => {
        li.classList.toggle('completed');
        updateLS();
    });

    todoLists.append(li);
    input.value = '';
    updateLS();

}

function updateLS() {
    const taskElems = document.querySelectorAll('li');
    const tasks = [];

    taskElems.forEach((li) => {
        const json = {
            value: li.innerHTML,
            completed: li.classList.contains('completed')
        }
        tasks.push(json);
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateCounts();
}


function updateCounts() {
    const todos = JSON.parse(localStorage.getItem('tasks'));

    const totalCount = document.getElementById('total-tasks');
    totalCount.innerHTML = todos.length;
}

const alltasks = document.getElementById('all-tasks');
alltasks.addEventListener("click", allTasks);
function allTasks() {

    const todos = JSON.parse(localStorage.getItem('tasks'));
    if (todos && todos.length) {
        todoLists.innerHTML = '';

        todos.forEach((task) => {
            addTodo(task);
        })
    }
}

const completedtasks = document.getElementById('completed-tasks');
completedtasks.addEventListener("click", completedTasks);
function completedTasks() {

    const todos = JSON.parse(localStorage.getItem('tasks'));
    if (todos && todos.length) {
        todoLists.innerHTML = '';

        todos.forEach((task) => {
            if (task.completed) {
                addTodo(task);
            }
        });
    }
}

const cleartasks = document.getElementById('clear-tasks');
cleartasks.addEventListener("click", clearAll);
function clearAll() {

    const todos = JSON.parse(localStorage.getItem('tasks'));
    const activeTasks = [];
    if (todos && todos.length) {
        todoLists.innerHTML = '';


        todos.forEach((task) => {
            if (!task.completed) {
                addTodo(task);
                activeTasks.push(task);
            }
        });
    }

    localStorage.setItem('tasks', JSON.stringify(activeTasks));

}