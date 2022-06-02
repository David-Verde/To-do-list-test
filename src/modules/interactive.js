/* eslint-disable no-restricted-globals */
import UpdateUi from './mainSec.js';

// status update

export function clear() {
  const newArr = UpdateUi.taskArr.filter((tasker) => tasker.complete !== true);
  localStorage.setItem('taskItems', JSON.stringify(newArr));
  UpdateUi.addTasks(newArr);
  location.reload();
}

export function updateSave() {
  if (localStorage.getItem('taskItems')) {
    UpdateUi.taskArr = JSON.parse(localStorage.getItem('taskItems'));
    UpdateUi.addTasks(UpdateUi.taskArr);
  } else {
    localStorage.setItem('taskItems', '');
    UpdateUi.taskArr = [];
  }
}
export function refresh() {
  location.reload();
}