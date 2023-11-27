/******************************************
 *  Author : Author
 *  Created On : Wed Nov 15 2023
 *  File : site.js
 *******************************************/

let todoInput; // Miejsce gdzie użytkownik wpisuje treść zadania
let errorInfo; // info o braku zadań / konieczności wpisania tekstu
let addBtn; // przycisk ADD - dodaje nowe elementy do listy
let ulList; // lista zadań, tagi UL
// let newTodo; // jesli chcemy korzystac jako ze zmiennej globalnej, tj nie przekazywac tego w parametr funkcji

let popup;
let todoToEdit;
let popupInfo;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

let todoToRemove;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewTodo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  todoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTodo = () => {
  if (todoInput.value !== "") {
    newTodo = document.createElement("li");
    newTodo.textContent = todoInput.value;
    createToolsArea(newTodo);
    ulList.append(newTodo);

    todoInput.value = "";
    errorInfo.textContent = "";
  } else errorInfo.textContent = "Wpisz treść zadania!";
};

const createToolsArea = (newTodo) => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  newTodo.append(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = "<i class='fas fa-check'></i>";

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = "<i class='fas fa-times'></i>";

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    removeTodo(e);
  }
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");
  console.log(todoToEdit.firstChild);

  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeTodoText = () => {
  if (popupInput.value !== "") {
    popupInfo.textContent = "";
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
  } else popupInfo.textContent = "Musisz podać jakąś tresć!";
};

const removeTodo = (e) => {
  e.target.closest("li").remove();

  const allTodos = ulList.querySelectorAll("li");

  if (allTodos.length === 0) {
    errorInfo.textContent = "Brak zadań na liście";
  }
};

const enterKeyCheck = (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
};

document.addEventListener("DOMContentLoaded", main);
