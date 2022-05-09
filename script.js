document.addEventListener('DOMContentLoaded',() => {
    const addButton = document.querySelector('.add-task')
    const taskWrapper = document.querySelector('.task-wrapper')
    const textField = document.querySelector('.input-task')
    let taskList = []
    let filteredList = []

    const divEl = document.createElement('div')
    const inputEl = document.createElement('input')
    const buttonEl = document.createElement('button')
    const logoButton = document.createElement('i')
    

    const task = divEl.cloneNode(true)
    const checkbox = inputEl.cloneNode(true)
    const taskDetails = inputEl.cloneNode(true)
    const controlButtons = divEl.cloneNode(true)
    const importantButton = buttonEl.cloneNode(true)
    const editButton = buttonEl.cloneNode(true)
    const deleteButton = buttonEl.cloneNode(true)
    const logoImportant = logoButton.cloneNode(true)
    const logoEdit = logoButton.cloneNode(true)
    const logoDelete = logoButton.cloneNode(true)


    taskDetails.type = 'text'
    taskDetails.setAttribute('disabled', '')
    task.classList.add('task')
    checkbox.classList.add('task-checkbox')
    checkbox.type = 'checkbox'
    taskDetails.classList.add('task-details')
    controlButtons.classList.add('task-controls')

    importantButton.classList.add('control','priority')
    editButton.classList.add('control','edit')
    deleteButton.classList.add('control','delete')

    logoImportant.classList.add('bi','bi-star')
    logoEdit.classList.add('bi','bi-pencil')
    logoDelete.classList.add('bi','bi-trash3')

    importantButton.appendChild(logoImportant)
    editButton.appendChild(logoEdit)
    deleteButton.appendChild(logoDelete)

    controlButtons.appendChild(importantButton)
    controlButtons.appendChild(editButton)
    controlButtons.appendChild(deleteButton)

    task.appendChild(checkbox)
    task.appendChild(taskDetails)
    task.appendChild(controlButtons)


    const rerenderTodoList = (list) => {
        taskWrapper.innerHTML = ''
        list.forEach(task => {
            taskWrapper.append(task)
        })
    }

    const onDone = (e) => {
        console.log(e.target.closest('.task'))
        e.target.closest('.task').classList.toggle('done')
        const done = taskList.filter(i => i.classList.contains('done'))
        const notDone = taskList.filter(i => !i.classList.contains('done'))
        taskList = [...notDone, ...done]
        rerenderTodoList(taskList)
    }

    const onPrioritize = (e) => {
        console.log(e.target)
        e.target.closest('.task').classList.toggle('important')
        const important = taskList.filter(i => i.classList.contains('important'))
        const notImportant = taskList.filter(i => !i.classList.contains('important'))
        taskList = [...important, ...notImportant]
        rerenderTodoList(taskList)
    }

    const onEdit = (e) => {
        console.log(e.target)
        const taskDetails = e.target.closest('.task').querySelector('.task-details')
        console.log(taskDetails)
        taskDetails.removeAttribute('disabled')
        taskDetails.focus()
    }

    const onDelete = e => {
        const index = taskList.findIndex(i => {
            const idToFind = e.target.closest('.task').getAttribute('id')
            return i.getAttribute('id') === idToFind
        })
        taskList.splice(index, 1)
        rerenderTodoList(taskList)
    }



    
    addButton.addEventListener('click', () => {
        if (textField.value === ''){
        alert('No tasks message')
        } else {
        console.log('Button clicked')
        
        const value = textField.value
        const newTask = task.cloneNode(true)
        newTask.setAttribute('id', taskList.length + 1)
        newTask.querySelector('.task-details').value = value
        newTask.querySelector('.task-checkbox').addEventListener('click', onDone)
        newTask.querySelector('.priority').addEventListener('click', onPrioritize)
        newTask.querySelector('.edit').addEventListener('click', onEdit)
        newTask.querySelector('.delete').addEventListener('click', onDelete)
        newTask.querySelector('.task-details').addEventListener('keypress', e => {
            if(e.keyCode === 13) {
                e.target.setAttribute('disabled', '')
                const {value} = e.target
                console.log(e.target)
            }
        })
        taskList.push(newTask)
        taskWrapper.innerHTML = ''
        taskList.forEach(task => {
            taskWrapper.append(task)
        })
        textField.value = ''
        console.log(taskList)
    }

    const filterField = document.querySelector('.filter-task')
    filterField.addEventListener('input', e => {
        console.log(e.target.value)
        filteredList = taskList.filter(i => i.querySelector('.task-details').value.includes(e.target.value))
        rerenderTodoList(filteredList)
    })


    })






})

/* <div class="task" id="0">
<input type="checkbox" class="task-checkbox" name="checkbox" >
<input type="text" class="task-details" disabled>
<div class="task-controls">
    <button class="control important"><i class="bi bi-star"></i></button> 
    <button class="control edit"><i class="bi bi-pencil"></i></button>
    <button class="control delete"><i class="bi bi-trash3"></i></button>    
</div> */