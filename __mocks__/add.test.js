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

    if (input) {
      input.value = description;
      form.dispatchEvent(new Event('submit'));
    }

    expect(container.querySelectorAll('#task-list li').length).not.toBe(0);
    expect(container.querySelector('#task-list li:last-child').textContent).toBe(description);
  });
});
