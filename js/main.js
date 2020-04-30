const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();

  const taskHTML = `<li class="list-group-item d-flex justify-content-between">
        <span contenteditable = 'true' class="task-title">${taskText}</span>
        <div id = ''>
            <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
            <button type="button" data-action="delete-task" class = 'btn btn-light align-self-end'>Удалить</button>
        </div>
    </li>`;
  tasksList.insertAdjacentHTML("afterbegin", taskHTML);
  input.value = "";
  input.focus;
  toggleEmptyListItem();

  showNotification("new");
});

tasksList.addEventListener("click", function (event) {
  if (event.target.getAttribute("data-action") == "delete-task") {
    const liElement = event.target.closest(".list-group-item");
    liElement.remove();
    toggleEmptyListItem();
    showNotification("delete");
  } else if (event.target.getAttribute("data-action") == "ready") {
    const parentElement = event.target.closest(".list-group-item");

    parentElement
      .querySelector(".task-title")
      .classList.add("task-title--done");

    parentElement
      .querySelector(".task-title")
      .setAttribute("contenteditable", "false");

    tasksList.insertAdjacentElement("beforeend", parentElement);

    event.target.remove();

    showNotification("ready");
  }
});

function toggleEmptyListItem() {
  if (tasksList.children.length > 1) {
    document.querySelector("#empty-list-item").style.display = "none";
  } else {
    document.querySelector("#empty-list-item").style.display = "block";
  }
}

function showNotification(type) {
  let newElement = document.createElement("div");

  switch (type) {
    case "new":
      newElement.className = "alert alert-warning";
      newElement.textContent = "Задача добавлена!";

      break;
    case "delete":
      newElement.className = "alert alert-danger";
      newElement.textContent = "Задача удалена!";
      break;
    case "ready":
      newElement.className = "alert alert-primary";
      newElement.textContent = "Готово!";
  }

  document
    .querySelector("#notifyHolder")
    .insertAdjacentElement("afterbegin", newElement);

  setTimeout(function () {
    newElement.style.opacity = "1";
  }, 300);

  setTimeout(function () {
    newElement.style.opacity = "0";
  }, 2300);

  setTimeout(function () {
    newElement.remove();
  }, 2600);
}
