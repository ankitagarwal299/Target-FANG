/* 
 https://www.youtube.com/watch?v=uEAUwEVdgqg&list=PLtzOJVmT3GDIOMvPDKyHfcVko_bqKnOVy&index=98
Fast & Easy Programming
*/
(function () {
  let tasksUl = document.querySelector("ul#tasks");
  let taskInput = document.querySelector("input#task");
  let form = document.querySelector("form#taskForm");

  let tasksArray = [];

  let clearButton = document.querySelector("button#clear");

  populateTasksArray();
  addInputDblClick();
  removeTaskClick();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (taskInput.value == "") return;
    tasksArray.push(taskInput.value);
    taskInput.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    getTasks();
  });

  function getTasks() {
    if (tasksArray.length > 0) {
      tasksUl.innerHTML = "";

      tasksArray.forEach(function (item, index) {
        let li = document.createElement("li");
        li.innerHTML = `<input type="text"  value="${item}" readonly />
      <span class="removeTask btn btn-small btn-primary float-right">remove task</span>
      `;

        li.classList.add("list-group-item");
        li.setAttribute("data-id", index);
        tasksUl.appendChild(li);
      });
    } else {
      tasksUl.innerHTML = "There are no tasks at the moment";
    }
  }

  function populateTasksArray() {
    if (localStorage.getItem("tasks") !== null) {
      let items = JSON.parse(localStorage.getItem("tasks"));
      items.forEach(function (item) {
        tasksArray.push(item);
      });
      getTasks();
    }
  }

  function addInputDblClick() {
    let lists = document.querySelectorAll('ul#tasks input[type="text"]');

    lists.forEach(function (input) {
      input.addEventListener("dblclick", function (e) {
        e.target.removeAttribute("readonly");
      });
      input.addEventListener("blur", function (e) {
        e.target.setAttribute("readonly", true);
      });

      input.addEventListener("change", function (e) {
        let index = e.target.parentElement.dataset.id;
        tasksArray[index] = e.target.value;
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
      });
    });
  }

  function removeTaskClick() {
    let spans = document.querySelectorAll("ul#tasks span.removeTask");

    spans.forEach(function (span) {
      span.addEventListener("click", function (e) {
        if (!confirm("Confirm Deletion")) return;

        tasksArray.splice(e.target.parentElement.dataset.id, 1);
        localStorage.setItem('tasks', JSON.stringify(tasksArray));

        e.target.parentElement.remove();
      });
    });
  }

})();