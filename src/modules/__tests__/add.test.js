/* eslint-disable no-tabs */

import jsdom from 'jsdom';
import NewItem from '../listClass.js';

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

// const addTasks = jest.fn();

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
      <input id="input" class="inputField" value="Do the dishes" type="text" placeholder="Add to your list here">
      <button type="button" class="btn enter"><i class='fa fa-arrow-left'></i></button>
      </div>
			<ul class="listBlock"></ul>
		</form>
		<div class="bottom top-sec">
			<button type="button" class="clear">Clear All Complete</button>
		</div>
	</div>
</body>
</html>
`);

const listblock = dom.window.document.querySelector('.listBlock');
const input = dom.window.document.querySelector('.inputField');
const taskArr = [];

const addTasks = (arrs) => {
  listblock.innerHTML = ' ';
  arrs.forEach((arr, index) => {
    const htmlTemp = `
      <li class="item-${index}" id="${index}">
      <input type="checkbox" class="task-${index}" name="task-${index} value="job-${index}">
      <p class="txt" contenteditable="true">${arr.task}</p>
      <button class="btn-${index}"><i class="fa fa-trash-o"></i></button>
      </li>
      `;
    listblock.insertAdjacentHTML('beforeend', htmlTemp);
  });
};

const updateTask = () => {
  const taskItem = new NewItem(input.value);
  taskArr.push(taskItem);
  taskArr.forEach((taskItem, pos) => {
    taskItem.index = pos + 1;
  });
  localStorage.setItem('taskItems', JSON.stringify(taskArr));
  input.value = '';
  addTasks(taskArr);
};

updateTask();

describe('Add tests', () => {
  test('Check task description', () => {
    addTasks(taskArr);
    expect(taskArr.length).toBe(1);
  });

  test('Check that a new task was created', () => {
    expect(dom.window.document.querySelector('.txt')).toBeTruthy();
  });
});
