import _ from 'lodash';
import './style.css';

 function component() {
   const element = document.createElement('div');
  const btn = document.createElement('button');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');



  element.appendChild(btn);

   return element;
 }

 document.body.appendChild(component());