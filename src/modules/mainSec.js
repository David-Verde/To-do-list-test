/* eslint-disable import/no-cycle */
import NewItem from './listClass.js';
import * as selectors from './selectors.js';

export default class UpdateUi {
  static taskArr = [];

  static enterBtn = selectors.enterBtn;

  static input = selectors.input;

  static listblock = selectors.listblock;

  static clear = selectors.clear;

  // populating the ul with task

  static updateTask = () => {
    const taskItem = new NewItem(UpdateUi.input.value);
    UpdateUi.taskArr.push(taskItem);
    UpdateUi.taskArr.forEach((taskItem, pos) => {
      taskItem.index = pos + 1;
    });
    localStorage.setItem('taskItems', JSON.stringify(UpdateUi.taskArr));
    UpdateUi.input.value = '';
    UpdateUi.addTasks(UpdateUi.taskArr);
  };

  static delTask = (taskItem, index) => {
    const taskBlock = document.getElementById(index);
    UpdateUi.taskArr = UpdateUi.taskArr.filter((item) => item !== taskItem);
    UpdateUi.taskArr.forEach((taskItem, pos) => {
      taskItem.index = pos + 1;
    });
    localStorage.setItem('taskItems', JSON.stringify(UpdateUi.taskArr));
    UpdateUi.listblock.removeChild(taskBlock);
  };

  static addTasks = (arrs) => {
    UpdateUi.listblock.innerHTML = ' ';
    arrs.forEach((arr, index) => {
      const htmlTemp = `
        <li class="item-${index}" id="${index}">
        <input type="checkbox" class="task-${index}" name="task-${index} value="job-${index}">
        <p class="txt" contenteditable="true">${arr.task}</p>
        <button class="btn-${index}"><i class="fa fa-trash-o"></i></button>
        </li>
        `;
      UpdateUi.listblock.insertAdjacentHTML('beforeend', htmlTemp);

      // Remove Button
      document.querySelectorAll(`.btn-${index}`).forEach((btn) => btn.addEventListener('click', (e) => {
        e.preventDefault();
        UpdateUi.delTask(arr, index);
      }));

      // Edit Task description
      document.querySelectorAll('.txt').forEach((par, index) => {
        par.addEventListener('input', () => {
          if (par.textContent) {
            UpdateUi.taskArr = JSON.parse(localStorage.getItem('taskItems'));
            UpdateUi.taskArr.forEach((taskblock, i) => {
              if (index === i) {
                taskblock.task = par.textContent;
                localStorage.setItem(
                  'taskItems',
                  JSON.stringify(UpdateUi.taskArr),
                );
              }
            });
          }
        });
      });

      // Cancel tasks
      document.querySelectorAll(`.task-${index}`).forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          document.querySelectorAll(`.item-${index}`).forEach((item) => {
            if (
              +checkbox.className.split('-')[1]
              === +item.className.split('-')[1]
            ) {
              item.classList.add('completed');
              localStorage.setItem(
                'classes',
                JSON.stringify(item.className.split(' ')[1]),
              );
            } else if (item.classList.contains('completed')) {
              item.classList.remove('completed');
            }
            function checkComplete() {
              const itemId = +document.getElementById(`${index}`).id;
              if (
                document
                  .getElementById(`${index}`)
                  .classList.contains('completed')
              ) {
                UpdateUi.taskArr[itemId].complete = true;
                localStorage.setItem(
                  'taskItems',
                  JSON.stringify(UpdateUi.taskArr),
                );
              } else {
                UpdateUi.taskArr[itemId].complete = false;
                localStorage.setItem(
                  'taskItems',
                  JSON.stringify(UpdateUi.taskArr),
                );
              }
            }
            checkComplete();
          });
        });
      });
    });
  };
}
