/* eslint-disable */
// eslint-disable-next-line no-unused-vars
import _, { } from 'lodash';
import * as method from './modules/interactive.js';
import UpdateUi from './modules/mainSec.js';
import './style.css';
import { refresh } from './modules/selectors.js';

method.updateSave();

UpdateUi.enterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (UpdateUi.input.value === '') {
    alert('Please add a task');
  } else {
    UpdateUi.updateTask();
  }
});

refresh.addEventListener('click', method.refresh);

UpdateUi.clear.addEventListener('click', clear);