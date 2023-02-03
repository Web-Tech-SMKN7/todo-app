const taskListEl = document.getElementById('task-list')
const addForm = document.getElementById('add-group')
const addBtn = document.getElementById('add')
const addInput = document.getElementById('add-input')

let tasks = [
  {
    title: "Ngoding sambil kayang",
    done: false,
  },
  {
    title: "Ngoding sambil kayang tapi ngodingnya pake bahasa Pascal",
    done: false,
  },
]

// -------------

loadFromLocal()

tasks.forEach((task, index) => {
  buildTask(task, index)
})

addForm.onsubmit = (ev) => {
  ev.preventDefault()

  const title = addInput.value

  if (!title) return

  const task = {
    title: title,
    done: false
  }

  tasks.push(task)
  buildTask(task, tasks.length - 1)

  addInput.value = ''

  saveToLocal()
}

// ------------

function buildTask(task, index) {
  const checkboxId = `task-${index}__check`
  const taskEl = document.createElement('div')
  const checkboxEl = document.createElement('input')
  const titleEl = document.createElement('label')
  const deleteBtn = document.createElement('div')

  checkboxEl.setAttribute('type', 'checkbox')
  checkboxEl.classList.add('task__check')
  checkboxEl.id = checkboxId
  checkboxEl.checked = task.done

  titleEl.setAttribute('for', checkboxId)
  titleEl.classList.add('task__title')
  titleEl.innerHTML = task.title

  deleteBtn.classList.add('task__delete')
  deleteBtn.innerHTML = 'Delete'

  deleteBtn.addEventListener('click', (event) => {
    tasks.splice(index, 1)
    event.currentTarget.parentNode.remove()
    saveToLocal()
  })

  taskEl.classList.add('task')
  taskEl.appendChild(checkboxEl)
  taskEl.appendChild(titleEl)
  taskEl.appendChild(deleteBtn)
  
  taskEl.addEventListener('click', (ev) => {
    ev.preventDefault()
    task.done = !task.done
    checkboxEl.checked = task.done

    console.log(!task.done)
    saveToLocal()
  })

  taskListEl.appendChild(taskEl)
}

function saveToLocal() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadFromLocal() {
  const jsonTasks = localStorage.getItem('tasks')
  
  if (!jsonTasks) return
  
  tasks = JSON.parse(jsonTasks)
}