/**
 * @jest-environment jsdom
 */
import UpdateUi from "./mainSec.js";
import listblock from "./selectors.js"

// jest.mock('./mainSec')

// test('Add new task to the list', () => {
//   document.body.innerHTML =
//   `<ul class="listBlock"></ul>`
//   addTasks();
//   const list = document.querySelectorAll('.listBlock');
//   expect(list).toHaveLength(1);
// })

describe('Add and delete tests', () => {
  test('Add one task to the list', () => {
    UpdateUi.addTasks('Doing the dishes');
    UpdateUi.addTasks('Take out the garbage')
    const storage = JSON.parse(localStorage.getItem('taskItems'));
    expect(storage).toHaveLength(2);
  });

  test('Delete one task from the list', () => {
    UpdateUi.delTask(0);
    const storage = JSON.parse(localStorage.getItem('taskItems'));
    expect(storage).toHaveLength(1);
  });
});
