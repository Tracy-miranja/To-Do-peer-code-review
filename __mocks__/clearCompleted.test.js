/**
 * @jest-environment jsdom
 */

import { clearCompleted, updateCompletedStatus } from './status.js';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
describe('Clear completed function', () => {
  it('should clear completed from the items array', () => {
    const items = [
      { description: 'Task 1', completed: true, index: 0 },
      { description: 'Task 2', completed: true, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
    ];

    const expectedItems = [
      { description: 'Task 3', completed: false, index: 0 },
    ];

    const result = clearCompleted(items);
    result.forEach((task, index) => {
      task.index = index;
    });

    expect(result).toEqual(expectedItems);
  });
  it('should update local storgae when clear completed function is called', () => {
    const items = [
      { description: 'Task 1', completed: true, index: 0 },
      { description: 'Task 2', completed: true, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
    ];

    const expectedItems = [
      { description: 'Task 3', completed: false, index: 0 },
    ];

    const result = clearCompleted(items);
    result.forEach((task, index) => {
      task.index = index;
    });
    expect(result).toEqual(expectedItems);
    setLocalStorage('toDo', result);
    expect(localStorage.getItem('toDo')).toEqual(JSON.stringify(result));
  });
});
describe('test update completed Status', () => {
  const container = document.createElement('div');
  container.innerHTML = `
      <form>
        <input type="text" id="item" placeholder="Add to your list.... " required />
        <button type="submit">Add</button>
      </form>
      <div class="task">
          <ul id="task-list">
            <li>
              <div class="label-wrapper"><input type="checkbox" id="checkbox"><label style="text-decoration: none;">Task1</label><i
                  class="fas fa-ellipsis-v dots-icon" aria-hidden="true"></i><i class="fas fa-trash delete-icon"
                  aria-hidden="true"></i></div>
            </li>
          </ul>
        </div>
    `;
  const checkbox = container.querySelector('#checkbox');
  const items = [{ description: 'Task 1', completed: false, index: 0 }];

  test('should change checkbox completed status when checked', () => {
    checkbox.addEventListener('click', () => {
      items.forEach((task) => {
        updateCompletedStatus(task, items);
      });
    });
    checkbox.click();
    const expectedItems = [{ description: 'Task 1', completed: true, index: 0 }];
    expect(items).toEqual(expectedItems);
  });
});
