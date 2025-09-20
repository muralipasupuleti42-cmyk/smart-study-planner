const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const timeline = document.getElementById("timeline");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task " + (task.completed ? "completed" : "");
    li.innerHTML = `<span><strong>${task.title}</strong> - ${task.subject} (Due: ${task.deadline})</span>
      <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
      <button class="delete-btn">Delete</button>`;
    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    });
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });
    taskList.appendChild(li);
  });
  renderTimeline();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const subject = document.getElementById("subject").value;
  const deadline = document.getElementById("deadline").value;
  tasks.push({ title, subject, deadline, completed: false });
  saveTasks();
  taskForm.reset();
});

function renderTimeline() {
  timeline.innerHTML = "";
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  sortedTasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `<div class="timeline-date">${task.deadline}</div>
      <div>${task.title} (${task.subject}) - ${task.completed ? "✅ Done" : "⏳ Pending"}</div>`;
    timeline.appendChild(div);
  });
}

renderTasks();
