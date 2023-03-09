function addTask(items, description) {
  const newTask = {
    description,
    completed: false,
    index: items.length,
  };
  items.push(newTask);

  // Update the index of all tasks based on their position in the array
  items.forEach((task, index) => {
    task.index = index;
  });
  return items;
}
export default addTask;