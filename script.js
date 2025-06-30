// script.js
const ul = document.getElementById("list-container");
const input = document.getElementById("input");
const search = document.getElementById("search");
const counter = document.getElementById("counter");
const darkToggle = document.getElementById("darkToggle");

function updateCounter() {
  const total = ul.children.length;
  const completed = document.querySelectorAll("li.completed").length;
  counter.textContent = `Total: ${total}, Completed: ${completed}, Remaining: ${total - completed}`;
}

function add() {
  const text = input.value.trim();
  if (text === "") return;

  const listitem = document.createElement("li");
  listitem.innerHTML = `
    <span onclick="toggleComplete(this)">${text}</span>
    <div>
      <button onclick="editItem(event)">Edit</button>
      <button onclick="deleteItem(event)">Delete</button>
    </div>
  `;
  ul.appendChild(listitem);
  input.value = "";
  saveTasks();
  updateCounter();
}

function deleteItem(event) {
  event.target.closest("li").remove();
  saveTasks();
  updateCounter();
}

function editItem(event) {
  const li = event.target.closest("li");
  const textSpan = li.querySelector("span");
  const newText = prompt("Edit your task:", textSpan.textContent);
  if (newText && newText.trim() !== "") {
    textSpan.textContent = newText.trim();
    saveTasks();
  }
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
  updateCounter();
}

function clearAll() {
  ul.innerHTML = "";
  saveTasks();
  updateCounter();
}

function saveTasks() {
  localStorage.setItem("tasks", ul.innerHTML);
}

function loadTasks() {
  ul.innerHTML = localStorage.getItem("tasks") || "";
  updateCounter();
}

function filterTasks() {
  const filter = search.value.toLowerCase();
  Array.from(ul.children).forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? "flex" : "none";
  });
}

search.addEventListener("input", filterTasks);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") add();
});

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkToggle.checked);
});

window.onload = loadTasks;
