const form = document.getElementById("to-do-form")
const optionContainer = document.getElementById("to-do-options")
const tasksContainer = document.getElementById("tasks-list")
const options = document.querySelectorAll(".to-do__option")

let tasks = []
let task

const generateID = () => {
   Math.random().toString(36).substr(2, 9)
}

const printHTML = (tasks) =>{
   tasks.forEach(task =>{
      const {id, task} = task
      console.log(id)
      console.log(task)

      const li = document.createElement("LI")
      li.classList.add("task")
      li.innerHTML = `
      <div class="task__check">
         <input class="task__input" type="checkbox" id="${id}">
         <label  class="task__label"  for="task1323">${task}.</label>
      </div>

      <i class="fas fa-trash task__erase task__erase--active"></i>
      `
      tasksContainer.appendChild(li)
      
   })
}

const addTask = task =>{
   
      console.log(task)

      const taskObj = {
         id: generateID(),
         task
      }

      tasks = [...tasks, task]

      console.log(tasks)
      printHTML(tasks)
   
}




optionContainer.addEventListener("click", e =>{
   if(e.target.classList.contains("to-do__option")) {
      options.forEach(options => options.classList.remove("to-do__option--active"));
      e.target.classList.add("to-do__option--active")
   }
   
})

form.addEventListener("submit", e =>{
   e.preventDefault()

   task = form.task.value
   console.log(task)

   if(task.trim().length > 0) {
      console.log(task)

      const taskObj = {
         id: generateID(),
         task
      }

      tasks = [...tasks, task]

      console.log(tasks)
      printHTML(tasks)
      
      form.reset()
   }

})