const BASEURL = 'http://localhost:3000'
const BOARDURL = `${BASEURL}/boards`
const LISTURL = `${BASEURL}/lists`
const TASKURL = `${BASEURL}/tasks`
let listsArray = []

document.addEventListener("DOMContentLoaded", () => {
  fetchBoards();
  fetchList();
  setTimeout(() => { fetchTasks()}, 3000);
  let listForm = document.querySelector('.list_form')
  listForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newList = e.target.childNodes[4].value
    postList(newList)})

    let boardForm = document.querySelector('.board_form')
    boardForm.addEventListener("submit", (e) => {
      e.preventDefault()
      let newBoard = e.target.childNodes[4].value
      postBoard(newBoard)
      })
})





// fetch functions
function fetchBoards() {
  fetch(BOARDURL)
  .then (res => res.json()).then(boards => boards.forEach(board => renderBoard(board))).then(console.log('boards are done'))
}

function fetchList() {
  
  fetch(`${BASEURL}/lists`)
  .then (res => res.json())
  .then (lists => lists.forEach((list) => listsArray.push(list))).then(console.log('lists are done'))
}

function fetchTasks() {
    fetch(TASKURL)
    .then(resp => resp.json())
    .then(tasks => tasks.forEach((task) => {renderTask(task)})).then(console.log('tasks are done'))
}



// render functions
function renderBoard(board) {
   let body = document.querySelector('body')
   let boardDiv = document.createElement('div')
   boardDiv.id = board.id
   //render the lists for each board
   
  
  let boardButton = document.createElement('button')
  boardButton.innerText = board.name
  boardButton.id = board.id
  body.append(boardButton, boardDiv)

  //does not work

  // for(const list of listsArray){
  //   renderList(list, boardDiv)
  // }
  boardButton.addEventListener('click', () =>{
    let activeBoard = document.querySelector('.activeBoard')

    //checks to see if activeRecord is null, the same as divBoard, or a different divBoard
    if (activeBoard == null)
    {
      boardDiv.classList.add('activeBoard')
      boardDiv.classList.remove('hidden')
      console.log('activeBoard was null')
      //works but duplicates the lists if called previously
      for(const list of listsArray){
        renderList(list, boardDiv)
      }
      }
    else if (activeBoard.id == boardDiv.id ) {
      boardDiv.classList.remove('activeBoard')
      boardDiv.classList.add('hidden')
      console.log('activeBoard was the same as boardDiv')

    }
    else if (activeBoard.id != boardDiv.id){
      activeBoard.classList.add('hidden')
      activeBoard.classList.remove('activeBoard')
      boardDiv.classList.remove('hidden')
      boardDiv.classList.add('activeBoard')
      console.log('activeBoard was a different boardDiv')
      
    }
    
  })
  
}

function renderList(list, boardDiv){
    if (boardDiv.id == list.board_id){
      
      let divRow = document.createElement("div")
      divRow.classList.add('.row')
      let divColumn = document.createElement('div')
      let listDiv = document.createElement('div')
      divColumn.className = 'column'
      listDiv.className = "card"
      listDiv.id = list.id

      let h6 = document.createElement('h6')
      h6.textContent = list.name

      //add button to delete list
      let btn = document.createElement('button')
      btn.textContent = 'delete list'
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        deleteList(list)
        // listDiv.remove()
      })

      //creating uL for tasks
      let ul = document.createElement('ul')
      ul.id = `list ${list.id}`

      //creating form for new tasks
      let taskForm = document.querySelector('.task_form')
      let newForm = taskForm.cloneNode(true);
      newForm.classList.add('hidden')

      newForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newTask = e.target.childNodes[4].value
        postTask(listDiv, newTask)
      })

      //button to show/hide form
      let hideButton = document.createElement('button')
      hideButton.innerText = 'add task'
      hideButton.addEventListener('click', () => {
        if (newForm.classList.contains('hidden')){
          newForm.classList.remove('hidden')
          hideButton.innerText = 'hide form'
        }
        else {
          newForm.classList.add('hidden')
          hideButton.innerText = 'add task'
        }
      })

      //appending elements

      h6.appendChild(btn)
      listDiv.append(h6, ul, newForm, hideButton)
      divColumn.append(listDiv)
      divRow.append(divColumn)
      boardDiv.append(divRow)
      
    }
}

function renderTask(task){
  let ul = document.getElementById(`list ${task.list_id}`)
  let li = document.createElement('li')
  li.textContent = task.name
  li.className = "list-li"
  //add button to delete li
  let btn = document.createElement('button')
  btn.textContent = 'X'
  btn.addEventListener('click', (e) => {
      e.preventDefault()
      deleteTask(task)
      li.remove()
    })

  ul.append(li)
  li.append(btn)
}

//delete functions
function deleteList(list){
    fetch(`${BASEURL}/lists/${list.id}`, {
        method: 'DELETE',
    })
    .then(resp => resp.json())
    .then (() => {
      let listDiv = document.querySelector('.card')
      listDiv.remove()
    })
}
function deleteTask(task){
    fetch(`${BASEURL}/tasks/${task.id}`, {
        method: 'DELETE',
    })
    .then(resp => resp.json())
}

// Post functions
function postBoard(newBoard) {
  fetch(BOARDURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'name': newBoard
    })
  })
  .then (res => res.json())
  .then (board => renderBoard(board))
 }
function postList(newList) {
  fetch(LISTURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'name': newList
    })
  })
  .then (res => res.json())
  .then (list => renderList(list))
 }

function postTask(div, taskName) {
  fetch(TASKURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'name': `${taskName}`,
      'list_id': div.id
    })
  })
  .then (res => res.json())
  .then (newTask => renderTask(newTask))
}

//handlers
function handleSubmitList(e){
  e.preventDefault()
  let newList = {
    name: e.target['list-name'].value
  }
  postList(newList)
}

function handleSubmitTask(e){
  e.preventDefault()
  let newTask = {
    name: e.target['task-name'].value
  }
  postTask(newTask)
  // e.target.reset()
}

function showLists(board){
   
}

