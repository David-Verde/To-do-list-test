/* eslint-disable no-tabs */

import jsdom from 'jsdom';

const { JSDOM } = jsdom;

function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}

const localStorage = storageMock();

const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="https://kit.fontawesome.com/2b1476549e.js" crossorigin="anonymous"></script>
    <title>To do</title>
</head>
<body>
	<div class="box">
		<div class="top-sec">
			<h1>Today's Tasks</h1>
			<button type="button" class="btn refresh"><i class="fas fa-sync-alt"></i></button>
		</div>
		<form>
			<div class="input">
      <input id="input" class="inputField" type="text" placeholder="Add to your list here">
      <button type="button" class="btn enter"><i class='fa fa-arrow-left'></i></button>
      </div>
			<ul class="listBlock">
      <li class="item-1" id="1">
     <input type="checkbox" class="task-1" name="task-1 value="job-1">
     <p class="txt" contenteditable="true">Doing the dishes</p>
     <button class="btn-1"><i class="fa fa-trash-o"></i></button>
     </li>
      </ul>
		</form>
		<div class="bottom top-sec">
			<button type="button" class="clear">Clear All Complete</button>
		</div>
	</div>
</body>
</html>
`);

const task = dom.window.document.getElementById(1);
const listblock = dom.window.document.querySelector('.listBlock');
let taskArr = [];

const delTask = (taskItem) => {
  taskArr = taskArr.filter((item) => item !== taskItem);
  taskArr.forEach((taskItem, pos) => {
    taskItem.index = pos + 1;
  });
  localStorage.setItem('taskItems', JSON.stringify(taskArr));
  listblock.removeChild(task);
};

describe('Delete tests', () => {
  test('Checks the existence of one task in the list', () => {
    expect(dom.window.document.getElementById('1')).toBeTruthy();
  });

  test('Check that one task from the list was deleted', () => {
    delTask();
    expect(dom.window.document.getElementById('1')).toBeFalsy();
  });
});
