// import jsdom from 'jsdom';

// const { JSDOM } = jsdom;

// function storageMock() {
//   const storage = {};

//   return {
//     setItem(key, value) {
//       storage[key] = value || '';
//     },
//     getItem(key) {
//       return key in storage ? storage[key] : null;
//     },
//     removeItem(key) {
//       delete storage[key];
//     },
//     get length() {
//       return Object.keys(storage).length;
//     },
//     key(i) {
//       const keys = Object.keys(storage);
//       return keys[i] || null;
//     },
//   };
// }

// const localStorage = storageMock();

// const dom = new JSDOM(`
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
// 		<script src="https://kit.fontawesome.com/2b1476549e.js" crossorigin="anonymous"></script>
//     <title>To do</title>
// </head>
// <body>
// 	<div class="box">
// 		<div class="top-sec">
// 			<h1>Today's Tasks</h1>
// 			<button type="button" class="btn refresh"><i class="fas fa-sync-alt"></i></button>
// 		</div>
// 		<form>
// 			<div class="input">
//       <input id="input" class="inputField" type="text" placeholder="Add to your list here">
//       <button type="button" class="btn enter"><i class='fa fa-arrow-left'></i></button>
//       </div>
// 			<ul class="listBlock">
//       <li class="item" id="0"><input type="checkbox" class="task-0" name="task-0 value="job-0"><p class="txt1" contenteditable="true">Doing the dishes</p><button class="btn-0"><i class="fa fa-trash-o"></i></button></li>
//       <li class="item completed" id="1"><input type="checkbox" class="task-1" name="task-1 value="job-1"><p class="txt2" contenteditable="true">Walk the dog</p><button class="btn-1"><i class="fa fa-trash-o"></i></button></li>
//       <li class="item completed" id="2"><input type="checkbox" class="task-2" name="task-2 value="job-2"><p class="txt3" contenteditable="true">Take out the trash</p><button class="btn-2"><i class="fa fa-trash-o"></i></button></li>
//       </ul>
// 		</form>
// 		<div class="bottom top-sec">
// 			<button type="button" class="clear">Clear All Complete</button>
// 		</div>
// 	</div>
// </body>
// </html>
// `);

// const p = dom.window.document.querySelectorAll('.txt')
// const taskArr = [];

// p.forEach((par, index) => {
//   par.addEventListener('input', () => {
//     if (par.textContent) {
//       taskArr = JSON.parse(localStorage.getItem('taskItems'));
//       taskArr.forEach((taskblock, i) => {
//         if (index === i) {
//           taskblock.task = par.textContent;
//           localStorage.setItem('taskItems', JSON.stringify(taskArr));
//         }
//       });
//     }
//   });
// });

// const task1Text = dom.window.document.querySelector('.txt1');

// describe('Editing a task', () => {
//   test('Checks task text content', () => {
//     expect(task1Text.textContent).toBe('Doing the dishes')
//   })

//   test('Checks task text content after being edited', () => {
    
//   })
// })