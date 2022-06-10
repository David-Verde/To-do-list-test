import jsdom from "jsdom";

const addTasks = jest.fn((arrs) => {
  const listblock = dom.window.document.querySelector(".listBlock");
  listblock.innerHTML = " ";
  arrs.forEach((arr, index) => {
    const htmlTemp = `
      <li class="item-${index}" id="${index}">
      <input type="checkbox" class="task-${index}" name="task-${index} value="job-${index}">
      <p class="txt" contenteditable="true">${arr.task}</p>
      <button class="btn-${index}"><i class="fa fa-trash-o"></i></button>
      </li>
      `;
    listblock.insertAdjacentHTML("beforeend", htmlTemp);
  });
});

const { JSDOM } = jsdom;

function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || "";
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
      <li class="item-0" id="0"><input type="checkbox" class="task-0" name="task-0 value="job-0"><p class="txt1" contenteditable="true">Doing the dishes</p><button class="btn-0"><i class="fa fa-trash-o"></i></button></li>
      <li class="item-1 completed" id="1"><input type="checkbox" class="task-1" name="task-1 value="job-1"><p class="txt2" contenteditable="true">Walk the dog</p><button class="btn-1"><i class="fa fa-trash-o"></i></button></li>
      <li class="item-2 completed" id="2"><input type="checkbox" class="task-2" name="task-2 value="job-2"><p class="txt3" contenteditable="true">Take out the trash</p><button class="btn-2"><i class="fa fa-trash-o"></i></button></li>
      </ul>
		</form>
		<div class="bottom top-sec">
			<button type="button" class="clear">Clear All Complete</button>
		</div>
	</div>
</body>
</html>
`);

let taskArr = [
  { task: "Doing the dishes", complete: false, index: 0 },
  { task: "Walk the dog", complete: true, index: 1 },
  { task: "Take out the trash", complete: true, index: 2 },
];

const checkComplete = (index) => {
  if (
    dom.window.document.getElementById(index).classList.contains("completed")
  ) {
    taskArr[index].complete = true;
    localStorage.setItem("taskItems", JSON.stringify(taskArr));
  } else {
    taskArr[index].complete = false;
    localStorage.setItem("taskItems", JSON.stringify(taskArr));
  }
};

const clear = () => {
  const newArr = taskArr.filter((tasker) => tasker.complete !== true);
  localStorage.setItem("taskItems", JSON.stringify(newArr));
  addTasks(newArr);
};

const checkedTask = (checkbox, item) => {
        if (checkbox.className.split("-")[1] === item.className.split("-")[1]) {
          item.classList.add("completed");
          localStorage.setItem("classes", JSON.stringify(item.className.split(" ")[1]));
        } else if (item.classList.contains("completed")) {
          item.classList.remove("completed");
        }
      };

const tasks = dom.window.document.getElementsByTagName("li");
const task1 = dom.window.document.getElementById("0");
const checkbox1 = dom.window.document.querySelector('.task-0')

describe("Clear all the tasks", () => {
  test("Check the number of existing tasks", () => {
    expect(tasks.length).toBe(3);
  });

  test("Check the number of tasks in local storage before clear all completed", () => {
    localStorage.setItem("taskItems", JSON.stringify(taskArr));
    const actualArr = JSON.parse(localStorage.getItem("taskItems"));
    expect(actualArr.length).toBe(3);
  });

  test("Check the number of tasks after clear all completed", () => {
    clear();
    const clearArr = JSON.parse(localStorage.getItem("taskItems"));
    expect(clearArr.length).toBe(1);
  });
});

describe("Update a task complete status", () => {
  test("Checks task current complete value", () => {
    expect(task1.classList).not.toBe("item-0 completed");
  });

  test("Checks task complete value after checkox being click", () => {
    checkedTask(checkbox1, task1)
    expect(task1.className).toBe("item-0 completed");
  });
});
