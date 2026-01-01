async function loadTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onclick = async () => {
      await fetch(`/tasks/${task._id}`, { method: "PATCH" });
      loadTasks();
    };

    li.appendChild(checkbox);
    li.append(" " + task.title);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");

  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });

  input.value = "";
  loadTasks();
}

loadTasks();
