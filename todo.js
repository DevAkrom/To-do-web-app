const button = document.querySelector('.button')
const input = document.querySelector('.input')
const selectBtn = document.querySelector('select')
const containerDIv = document.querySelector('.container')
const wholeTasks = document.querySelector('.wholeTasks')

button.addEventListener('click', add)
document.addEventListener('DOMContentLoaded', getItem)
input.addEventListener('keypress', function(){
    
    if(event.key  === 'Enter'){
        add()
    }
})

wholeTasks.addEventListener('click', deleter)


function add(){
    let task = input.value;

    locallyStored(input.value)
    let taskDiv = document.createElement('div')
    taskDiv.classList.add('task-container')
    wholeTasks.appendChild(taskDiv)
    let p = document.createElement('p')
    taskDiv.appendChild(p)
    let buttonTick = document.createElement('button')
    buttonTick.classList.add('tick')
    taskDiv.classList.add('unfinished')
    let deleteTick = document.createElement('button')
    deleteTick.classList.add('delete')
    deleteTick.classList.add('hoverdel')
    buttonTick.innerHTML = `<i class="fa-solid fa-check"></i>`
    buttonTick.classList.add('hoveradd')
    let ini = buttonTick.querySelector('i')
    ini.style.pointerEvents = 'none'
    deleteTick.innerHTML = `<i class="fa-solid fa-trash"></i>`
    p.classList.add('output-text')
    let secondI = deleteTick.querySelector('i')
    secondI.style.pointerEvents = 'none'
    ini.classList.add('bt')
    secondI.classList.add('bt')
    taskDiv.appendChild(buttonTick)
    taskDiv.appendChild(deleteTick)
    p.innerText = task;
    input.value = ''
}


selectBtn.addEventListener('change', function(e){
    let clickedItem = e.target.value;
    let children = wholeTasks.childNodes
    console.log()
    if(clickedItem === 'all'){
        children.forEach((child)=>{
            child.style.display = 'flex'
        })
    }else if(clickedItem === 'completed'){
        children.forEach((child)=>{
            if(child.classList.contains('finished')){
                child.style.display = 'flex'
            }else{
                child.style.display = 'none'
            }
        })
        

    }else if(clickedItem === 'uncompleted'){
        children.forEach((child)=>{
            if(child.classList.contains('unfinished')){
                child.style.display = 'flex'
            }else{
                child.style.display = 'none'
            }
        })
    }
})


function locallyStored(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getItem(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach((item)=>{
        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task-container')
        wholeTasks.appendChild(taskDiv)
        let p = document.createElement('p')
        taskDiv.appendChild(p)
        let buttonTick = document.createElement('button')
        buttonTick.classList.add('tick')
        taskDiv.classList.add('unfinished')
        let deleteTick = document.createElement('button')
        deleteTick.classList.add('delete')
        deleteTick.classList.add('hoverdel')
        buttonTick.innerHTML = `<i class="fa-solid fa-check"></i>`
        buttonTick.classList.add('hoveradd')
        let ini = buttonTick.querySelector('i')
        ini.style.pointerEvents = 'none'
        deleteTick.innerHTML = `<i class="fa-solid fa-trash"></i>`
        p.classList.add('output-text')
        let secondI = deleteTick.querySelector('i')
        secondI.style.pointerEvents = 'none'
        ini.classList.add('bt')
        secondI.classList.add('bt')
        taskDiv.appendChild(buttonTick)
        taskDiv.appendChild(deleteTick)
        p.innerText = item
    })
}

function deleter(e){
    let clicked = e.target;
    if(clicked.classList.contains('delete')){
        let name = e.target.parentElement.childNodes[0].innerText
        let todos;
        if(localStorage.getItem('todos')===null){
            todos = []
        }else{
            todos = JSON.parse(localStorage.getItem('todos'))
        }

        clicked.parentElement.classList.add('fall')
        clicked.parentElement.style.transition = `0.4s all ease`
        clicked.addEventListener('transitionend', function(){
            e.target.parentElement.remove()
        })
        
         todos.splice(todos.indexOf(name), 1)
         localStorage.setItem('todos', JSON.stringify(todos))
    }else if(clicked.classList.contains('tick')){
        e.target.classList.remove('hoveradd')
        let parent = e.target.parentElement
        parent.style.opacity = 0.7;
        parent.classList.remove('unfinished')
        parent.classList.add('finished')
        console.log(parent.classList)
    }
}