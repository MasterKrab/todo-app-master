
// Selectors
const form = document.getElementById("to-do-form")
const optionContainer = document.getElementById("to-do-options")
const tasksContainer = document.getElementById("tasks-list")
const options = document.querySelectorAll(".to-do__option")
const eraseButton = document.getElementById("erase-button")

//Variables
let tasks = []
let task
let complete = false

// Fragment
const fragment = document.createDocumentFragment()

// Functions

   // LocalStorage
const syncStorage = () =>{
   localStorage.setItem("tasks", JSON.stringify(tasks))
}
   // Function to generate a unique id
const generateID = () => Math.random().toString(36).substr(2, 9)

   // Filter to completed tasks
const filterCompleted = () =>{
   complete = true
   printHTML(tasks.filter(task => task.finish))
}
   // Filter to active tasks
const filterActive = () =>{
   complete = false
   printHTML(tasks.filter(task => !task.finish))
}


const printHTML = (tasks) =>{

   tasksContainer.textContent = ""

   tasks.forEach(taskObj =>{
      const {id, task, finish} = taskObj
      

      const li = document.createElement("LI")
      li.classList.add("task")
      const div = document.createElement("DIV")
      div.classList.add("task__check")
      div.innerHTML =`
         <input class="task__input" type="checkbox" id="${id}">
         <label  class="task__label"  for="${id}">${task}.</label>
      `
      if(finish) div.firstElementChild.checked = true
      li.appendChild(div)
      
      const i = document.createElement("I")
      i.classList.add("fas", "fa-trash", "task__erase")
      if(complete) {
         eraseButton.classList.add("erase-button--active")
         i.classList.add("task__erase--active")
      }else{
         eraseButton.classList.remove("erase-button--active")
      }
      i.dataset.id = id
      li.appendChild(i)

      fragment.appendChild(li)
   })
   tasksContainer.appendChild(fragment)
}

const addTask = task =>{

      const taskObj = {
         id: generateID(),
         task: task,
         finish: false,
      }

      tasks = [...tasks, taskObj]

      printHTML(tasks)  
      syncStorage()
}

// EventListeners

optionContainer.addEventListener("click", e =>{
   if(e.target.classList.contains("to-do__option")) {
      options.forEach(options => options.classList.remove("to-do__option--active"));
      e.target.classList.add("to-do__option--active")

      if(e.target.dataset.id == 1) {
         complete = false
         printHTML(tasks)
      }

      e.target.dataset.id == 2 && filterActive()
      e.target.dataset.id == 3 && filterCompleted()
      
   }
})

form.addEventListener("submit", e =>{
   e.preventDefault()

   task = form.task.value

   if(task.trim().length > 0) {

      addTask(task)
      
      options.forEach(option => {
         option.classList.remove("to-do__option--active")
         if(option.dataset.id == "1" && !option.classList.contains("to-do__option--active")) { 
            option.classList.add("to-do__option--active")
            complete = false
            printHTML(tasks)
         }
      })
      form.reset()
   }
})

tasksContainer.addEventListener("click", e =>{
   if(e.target.checked){
      tasks.forEach(task =>{
         if(task.id == e.target.id)
         task.finish = true
      })
   }else{
      tasks.forEach(task =>{
         if(task.id == e.target.id)
         task.finish = false
      })
   }

   if(e.target.classList.contains("task__erase")){
      tasks = tasks.filter(task => task.id !== e.target.dataset.id)
      if(tasks.filter(task => task.id !== e.target.dataset.id).length < 2)  eraseButton.classList.remove("erase-button--active")
      filterCompleted()
   }
   
   syncStorage()
})

// Delete all button
eraseButton.addEventListener("click", () =>{
   tasks = tasks.filter(task => !task.finish)
   printHTML(tasks)
   eraseButton.classList.remove("erase-button--active")

   
   options.forEach(option => {
      option.classList.remove("to-do__option--active")
      if(option.dataset.id == "1" && !option.classList.contains("to-do__option--active")) { 
         option.classList.add("to-do__option--active")
         complete = false
         printHTML(tasks)
      }
   })

   syncStorage()
})

// Localstorage 
document.addEventListener("DOMContentLoaded", ()=>{
   tasks = JSON.parse(localStorage.getItem("tasks")) || []

   printHTML(tasks)

})