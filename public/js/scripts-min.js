"use strict";function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var task,form=document.getElementById("to-do-form"),optionContainer=document.getElementById("to-do-options"),tasksContainer=document.getElementById("tasks-list"),options=document.querySelectorAll(".to-do__option"),eraseButton=document.getElementById("erase-button"),tasks=[],complete=!1,fragment=document.createDocumentFragment(),syncStorage=function(){localStorage.setItem("tasks",JSON.stringify(tasks))},generateID=function(){return Math.random().toString(36).substr(2,9)},filterCompleted=function(){complete=!0,printHTML(tasks.filter((function(t){return t.finish})))},filterActive=function(){complete=!1,printHTML(tasks.filter((function(t){return!t.finish})))},printHTML=function(t){tasksContainer.textContent="",t.forEach((function(t){var e=t.id,a=t.task,n=t.finish,r=document.createElement("LI");r.classList.add("task");var o=document.createElement("DIV");o.classList.add("task__check"),o.innerHTML='\n         <input class="task__input" type="checkbox" id="'.concat(e,'">\n         <label  class="task__label"  for="').concat(e,'">').concat(a,".</label>\n      "),n&&(o.firstElementChild.checked=!0),r.appendChild(o);var s=document.createElement("I");s.classList.add("fas","fa-trash","task__erase"),complete?(eraseButton.classList.add("erase-button--active"),s.classList.add("task__erase--active")):eraseButton.classList.remove("erase-button--active"),s.dataset.id=e,r.appendChild(s),fragment.appendChild(r)})),tasksContainer.appendChild(fragment)},addTask=function(t){var e={id:generateID(),task:t,finish:!1};tasks=[].concat(_toConsumableArray(tasks),[e]),printHTML(tasks),syncStorage()};optionContainer.addEventListener("click",(function(t){t.target.classList.contains("to-do__option")&&(options.forEach((function(t){return t.classList.remove("to-do__option--active")})),t.target.classList.add("to-do__option--active"),1==t.target.dataset.id&&(complete=!1,printHTML(tasks)),2==t.target.dataset.id&&filterActive(),3==t.target.dataset.id&&filterCompleted())})),form.addEventListener("submit",(function(t){t.preventDefault(),(task=form.task.value).trim().length>0&&(addTask(task),options.forEach((function(t){t.classList.remove("to-do__option--active"),"1"!=t.dataset.id||t.classList.contains("to-do__option--active")||(t.classList.add("to-do__option--active"),complete=!1,printHTML(tasks))})),form.reset())})),tasksContainer.addEventListener("click",(function(t){t.target.checked?tasks.forEach((function(e){e.id==t.target.id&&(e.finish=!0)})):tasks.forEach((function(e){e.id==t.target.id&&(e.finish=!1)})),t.target.classList.contains("task__erase")&&(tasks=tasks.filter((function(e){return e.id!==t.target.dataset.id})),filterCompleted()),syncStorage()})),eraseButton.addEventListener("click",(function(){printHTML(tasks=[]),eraseButton.classList.remove("erase-button--active"),syncStorage()})),document.addEventListener("DOMContentLoaded",(function(){tasks=JSON.parse(localStorage.getItem("tasks"))||[],printHTML(tasks)}));