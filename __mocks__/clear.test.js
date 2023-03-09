/**
 * @jest-environment jsdom
 */
import updateTaskDescription from './edit.js';

describe('updateTaskDescription', () => {
  let items;

  beforeEach(() => {
    items = [
      { id: 1, description: 'Task 1', completed: false },
      { id: 2, description: 'Task 2', completed: true },
      { id: 3, description: 'Task 3', completed: false },
    ];
    localStorage.setItem('items', JSON.stringify(items));
  });

  test('should update the description of a task in the items array', () => {
    const task = items[1];
    const newDescription = 'Updated task description';
    const updatedItems = updateTaskDescription(task, newDescription, items);
    expect(updatedItems[1].description).toBe(newDescription);
  });

  test('should update the description in localStorage', () => {
    const task = items[1];
    const newDescription = 'Updated task description';
    updateTaskDescription(task, newDescription, items);
    const storedItems = JSON.parse(localStorage.getItem('items'));
    expect(storedItems[1].description).not.toBe(newDescription);
  });
});
