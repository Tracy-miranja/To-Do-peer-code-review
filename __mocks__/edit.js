function updateTaskDescription(task, newDescription, items) {
  const index = items.findIndex((item) => item.id === task.id);
  const updatedTask = { ...task, description: newDescription };
  const updatedItems = [
    ...items.slice(0, index),
    updatedTask,
    ...items.slice(index + 1),
  ];
  localStorage.setItem('items', JSON.stringify(updatedItems));
  return updatedItems;
}
export default { updateTaskDescription };