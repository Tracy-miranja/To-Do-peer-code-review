function editTask(task, items, callback) {
  const container = document.createElement('div');
  container.innerHTML = `
      <input type="text" class="edit-input" value="${task.description}">
    `;
  const input = container.querySelector('.edit-input');

  input.addEventListener('blur', () => {
    task.description = input.value;
    callback(task, items);
  });

  return task;
}

export default editTask;
