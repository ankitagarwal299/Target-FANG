const form = document.getElementById('todo-form');
const inputField = document.getElementById('input-field');
const todoListEl = document.getElementById('todo-list');

/* Retrieve from LS */
const todos = JSON.parse(localStorage.getItem('tasks'));
if (todos) {
    todoListEl.innerHTML = '';
    todos.forEach((task) => {
        addTodo(task);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!inputField.value?.length) return;

    const json = {
        value: inputField.value,
        completed: false
    }
    addTodo(json);

});

/* @param task = { value: string, completed: boolean } */
function addTodo(task) {
    const taskEL = document.createElement('li');
    taskEL.innerHTML = task.value;
    /*  taskEL.innerHTML =
         `<span class="task-text">${task.value}</span>
          <input type="text" name="input-text" class="edit-input hidden" value="${task.value}">
          <i class="fas fa-pencil-alt edit-btn" style="float: right;"></i>`;
 
 
 
     const editBtn = taskEL.querySelector('.edit-btn');
     const taskText = taskEL.querySelector('.task-text');
     const editInput = taskEL.querySelector('.edit-input');
 
     editBtn.addEventListener('click', (e) => {
         e.stopPropagation();
         taskText.classList.toggle('hidden');
         editInput.classList.toggle('hidden');
     });
 
     editInput.addEventListener('input', (e) => {
         taskText.innerText = e.target.value;
         editInput.value = e.target.value;
         updateLS();
     }); */

    if (task.completed) {
        taskEL.classList.add('completed');
    }

    /* left click to mark complete */
    taskEL.addEventListener(('click'), () => {
        taskEL.classList.toggle('completed');
        updateLS();
    });


    /* right click to delete*/
    taskEL.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        taskEL.remove();
        updateLS();
    });

    inputField.value = '';//reset field
    todoListEl.appendChild(taskEL);
    updateLS();
}

function updateLS() {
    const lists = document.querySelectorAll('li');
    const tasks = [];
    lists.forEach((listEl) => {
        let taskObj = {
            value: listEl.innerText,
            completed: listEl.classList.contains('completed')
        }
        tasks.push(taskObj);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateCounts();
}

function updateCounts() {
    const totalTaskEl = document.getElementById('total-tasks');

    const todos = JSON.parse(localStorage.getItem('tasks'));

    totalTaskEl.innerHTML = `Total:${todos.length ? todos.length : 0} task`;
}

const complTasks = document.getElementById('completed-tasks');
complTasks.addEventListener(('click'), (e) => {
    const todos = JSON.parse(localStorage.getItem('tasks'));
    todoListEl.innerHTML = '';

    if (todos?.length) {
        todos.forEach((task) => {
            if (task.completed) {
                const listEl = document.createElement('li');
                listEl.innerHTML = task.value;
                listEl.classList.add('completed');
                todoListEl.append(listEl);
            }
        });
    }
});

const allTasks = document.getElementById('all-tasks');
allTasks.addEventListener(('click'), (e) => {
    const todos = JSON.parse(localStorage.getItem('tasks'));
    todoListEl.innerHTML = '';

    if (todos?.length) {
        todos.forEach((task) => {
            addTodo(task);
        });
    }
});

const clearTasks = document.getElementById('clear-tasks');
clearTasks.addEventListener(('click'), (e) => {
    const todos = JSON.parse(localStorage.getItem('tasks'));
    todoListEl.innerHTML = '';



    const activeTasks = todos.filter((item) => {
        return item.completed != true;
    });

    updateLS();

    for (let i = 0; i < activeTasks.length; i++) {
        if (!activeTasks[i].completed) {
            addTodo(activeTasks[i]);
        }
    }
});