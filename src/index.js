<<<<<<< Updated upstream
import _ from 'lodash';
import printMe from './print.js';
=======
// eslint-disable-next-line no-unused-vars
import _, {} from 'lodash';
import * as method from './modules/interactive.js';
import UpdateUi from './modules/mainSec.js';
import './style.css';
import { refresh } from './modules/selectors.js';
>>>>>>> Stashed changes

method.updateSave();

<<<<<<< Updated upstream
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

   return element;
 }

 document.body.appendChild(component());
=======
UpdateUi.enterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (UpdateUi.input.value === '') {
    alert('Please add a task');
  } else {
    UpdateUi.updateTask();
  }
});

refresh.addEventListener('click', method.refresh);
>>>>>>> Stashed changes
