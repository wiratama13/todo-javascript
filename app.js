// kumpulkan semua UI element

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");

const clearButton = document.querySelector("#clear-todos");

// ini adalah kumpulan event listener
immediateLoadEventListener();

function immediateLoadEventListener() {
  // get todo from local storage
  document.addEventListener("DOMContentLoaded", getTodos);

  // add todo
  todoForm.addEventListener("submit", addTodo);

  // delete todo from targer
  todoList.addEventListener("click", deleteTodo);

  // delete todo all
  clearButton.addEventListener("click", clearTodos);

  // filter todo

  filterInput.addEventListener("keyup", filterTodos);
}

// reusable code
function createTodoElement(value) {
  // add li element
  const li = document.createElement("li");

  //add class to element li
  li.className =
    "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

  li.appendChild(document.createTextNode(value));

  // membuat delete button
  const a = document.createElement("a");

  // membuat properti untuk a element
  a.href = "#";
  a.className = "delete-todo badge badge-danger";
  a.innerHTML = "Delete";

  // a in li
  li.appendChild(a);

  // li in ul
  todoList.appendChild(li);
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// DOM function

function getTodos() {
  const todos = getItemFromLocalStorage();

  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value) {
    createTodoElement(todoInput.value);

    addTodoLocalStorage(todoInput.value);

    todoInput.value = "";
  } else {
    alert("tulis sebuah todo, tidak boleh kosong");
  }
}

function addTodoLocalStorage(todoInputValue) {
  const todos = getItemFromLocalStorage();

  todos.push(todoInputValue);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
  e.preventDefault();

  if (e.target.classList.contains("delete-todo")) {
    if (confirm("Apakah anda yakin akan menghapus ? ")) {
      const parent = e.target.parentElement;

      parent.remove();
      deleteTodoLocalStorage(parent);
    }
  }
}

function deleteTodoLocalStorage(deletedElement) {
  const todos = getItemFromLocalStorage(); //menghapus element

  todos.forEach((todo, index) => {
    if (deletedElement.firstChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
  todoList.innerHTML = "";
  clearTodoLocalStorage()
}

function clearTodoLocalStorage() {
  localStorage.clear()
}

function filterTodos(e) {
  const filterText = e.target.value; // memunculkan binding
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(filterText) != -1) {
      item.setAttribute("style", "display: block");
    } else {
      item.setAttribute("style", "display: none !important");
    }
  });
}