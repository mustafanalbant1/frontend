//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener() {
  //Tüm event listenerlar
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinizden emin misiniz?")) {
    //Ara yüzden kaldırma
    // todoList.innerHTML = ""; //yavaş
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItem = document.querySelectorAll(".list-group-item");

  listItem.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className == "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFormStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo başarıyla silindi...");
  }
}

function deleteTodoFormStorage(deleteTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1); //Arraydedn değeri silebiliriz.
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim(); //trim baştaki ve sondaki boşlukları kaldırır
  let todos = getTodosFromStorage();
  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin...");
  } else if (todos.includes(newTodo)) {
    showAlert("danger", "Bu todo zaten mevcut...");
  } else {
    addTodoUI(newTodo);
    addTodoStorage(newTodo);
    showAlert("success", "Todo eklendi...");
  }

  console.log(newTodo);

  e.preventDefault();
}
function getTodosFromStorage() {
  //Storageden Todoalrı alma
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function addTodoStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;
  firstCardBody.appendChild(alert);
  alert.textContent = message;

  //setTimeout

  setTimeout(function () {
    alert.remove();
  }, 2000);
}

function addTodoUI(newTodo) {
  //List Item Oluşturma
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";
  //Link Oluşurma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";

  //Text Node Ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //Todo List'e List Item'ı ekleme
  todoList.appendChild(listItem);

  todoInput.value = "";
}
