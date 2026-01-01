const API_URL = "http://localhost:5050/tasks";

// Load tasks when page opens
async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    list.appendChild(li);
  });
}

// Add new task
async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();

  if (!title) {
    alert("Please enter a task");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  input.value = "";
  loadTasks();
}

// Load tasks on page load
loadTasks();
