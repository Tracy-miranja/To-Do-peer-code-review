function editTask(task, items, callback) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = task.description;
  input.classList.add('edit-input');
  input.addEventListener('blur', () => {
    task.description = input.value;
    callback(task, items);
  });
  return task;
}
export default editTask;