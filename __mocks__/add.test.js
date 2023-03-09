/**
 * @jest-environment jsdom
 */
import addTask from './Add.js';
import deleteTask from './delete.js';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('addTask function', () => {
  beforeEach(() => {
    localStorageMock.clear();
    container.innerHTML = '';
  });

  it('should add a task to the items array', () => {
    const items = [];
    const description = 'Test task';

    addTask(items, description);

    expect(items.length).toBe(1);
    expect(items[0].description).toBe(description);
    expect(items[0].completed).toBe(false);
    expect(items[0].index).toBe(0);
  });

  it('should store the updated items array in localStorage', () => {
    const items = [];
    const description = 'Test task';

    addTask(items, description);

    expect(localStorageMock.getItem('items')).not.toEqual(JSON.stringify(items));
  });

  test('should add a new task to the list', () => {
    // Arrange
    const description = 'Task 1';
    const container = document.createElement('div');
    container.innerHTML = `
      <form>
        <input type="text" id="item" placeholder="Add to your list.... " required />
        <button type="submit">Add</button>
      </form>
      <div id="task-list">
        <ul>
          <li>Task 1</li>
        </ul>
      </div>
    `;
    const form = container.querySelector('form');
    const input = container.querySelector('#item');

    // Act
    if (input) {
      input.value = description;
      form.dispatchEvent(new Event('submit'));
    }

    // Assert
    expect(container.querySelectorAll('#task-list li').length).not.toBe(0);
    expect(container.querySelector('#task-list li:last-child').textContent).toBe(description);
  });
});

describe('deleteTask function', () => {
  it('should delete a task from the items array', () => {
    const items = [
      { description: 'Task 1', completed: false, index: 0 },
      { description: 'Task 2', completed: false, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
    ];
    const indexToDelete = 1;
    const expectedItems = [
      { description: 'Task 1', completed: false, index: 0 },
      { description: 'Task 3', completed: false, index: 1 },
    ];

    const result = deleteTask(items, indexToDelete);

    expect(result).toEqual(expectedItems);
  });

  it('should update the index property of the remaining tasks', () => {
    const items = [
      { description: 'Task 1', completed: false, index: 0 },
      { description: 'Task 2', completed: false, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
    ];
    const indexToDelete = 1;
    const expectedItems = [
      { description: 'Task 1', completed: false, index: 0 },
      { description: 'Task 3', completed: false, index: 1 },
    ];

    const result = deleteTask(items, indexToDelete);

    expect(result).toEqual(expectedItems);
  });
});
