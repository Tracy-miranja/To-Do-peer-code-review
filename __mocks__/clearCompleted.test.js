/**
 * @jest-environment jsdom
 */
import { clearCompleted } from "../src/modules/status";
const localStorageMock = (function () {
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
  
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
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
      { description: 'Task 3', completed: false, index: 0 }
    ];

    const result = clearCompleted(items);
    result.forEach((task, index) => {
      task.index = index;
    });
    
    expect(result).toEqual(expectedItems);
   
  })
  it('should update local storgae when clear completed function is called', () => {
    const items = [
      { description: 'Task 1', completed: true, index: 0 },
      { description: 'Task 2', completed: true, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
    ];
  
    const expectedItems = [
      { description: 'Task 3', completed: false, index: 0 }
    ];

    const result = clearCompleted(items);
    result.forEach((task, index) => {
      task.index = index;
    });
    expect(result).toEqual(expectedItems);
   setLocalStorage('toDo',result)
  expect(localStorage.getItem('toDo')).toEqual(JSON.stringify(result));
   
  })
});
 