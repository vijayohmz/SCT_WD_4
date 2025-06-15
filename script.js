let listCounter = 0;

function createList() {
  const listName = document.getElementById('new-list-name').value.trim();
  if (listName === '') return;

  const listId = `list-${listCounter++}`;
  const listContainer = document.createElement('div');
  listContainer.className = 'list';
  listContainer.id = listId;

  listContainer.innerHTML = `
    <h3>${listName}</h3>
    <div class="tasks"></div>
    <input type="text" placeholder="Task Description" id="task-desc-${listId}" />
    <input type="datetime-local" id="task-time-${listId}" />
    <button class="add-task" onclick="addTask('${listId}')">Add Task</button>
  `;

  document.getElementById('lists-container').appendChild(listContainer);
  document.getElementById('new-list-name').value = '';
}

function addTask(listId) {
  const descInput = document.getElementById(`task-desc-${listId}`);
  const timeInput = document.getElementById(`task-time-${listId}`);
  const description = descInput.value.trim();
  const dateTime = timeInput.value;

  if (description === '') return;

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task-item';
  taskDiv.innerHTML = `
    <input type="checkbox" onchange="toggleComplete(this)" />
    <input type="text" value="${description}" disabled />
    <input type="datetime-local" value="${dateTime}" disabled />
    <button class="edit" onclick="editTask(this)">Edit</button>
    <button class="delete" onclick="deleteTask(this)">Delete</button>
  `;

  document.querySelector(`#${listId} .tasks`).appendChild(taskDiv);
  descInput.value = '';
  timeInput.value = '';
}

function toggleComplete(checkbox) {
  const taskItem = checkbox.parentElement;
  taskItem.querySelectorAll('input[type="text"], input[type="datetime-local"]').forEach(input => {
    input.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  });
}

function editTask(button) {
  const taskItem = button.parentElement;
  const inputs = taskItem.querySelectorAll('input[type="text"], input[type="datetime-local"]');
  const isDisabled = inputs[0].disabled;
  inputs.forEach(input => input.disabled = !isDisabled);
  button.textContent = isDisabled ? 'Save' : 'Edit';
}

function deleteTask(button) {
  button.parentElement.remove();
}
