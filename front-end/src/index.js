const BASEURL = 'http://localhost:3000'
const BOARDURL = `${BASEURL}/boards`
const LISTURL = `${BASEURL}/lists`
const TASKURL = `${BASEURL}/tasks`
document.addEventListener("DOMContentLoaded", () => {
  fetchBoards();
  setTimeout(() => { fetchList()}, 30);
  setTimeout(() => { fetchTasks()}, 50);
    let boardForm = document.querySelector('.board_form')
      boardForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newBoard = e.target.childNodes[4].value
        postBoard(newBoard)
      })
})





// fetch functions
function fetchBoards() {
  console.log('boards have started')
  fetch(BOARDURL)
  .then (res => res.json()).then(boards => boards.forEach(board => renderBoard(board))).then(console.log('boards are done'))
}

function fetchList() {
  console.log('lists have started')
  fetch(`${BASEURL}/lists`)
  .then (res => res.json()).then(lists => lists.forEach(list => renderList(list))).then(console.log('lists are done'))
}


function fetchTasks() {
  console.log('tasks have started')
    fetch(TASKURL)
    .then(resp => resp.json())
    .then(tasks => tasks.forEach((task) => {renderTask(task)})).then(console.log('tasks are done'))
}



// render functions
function renderBoard(board) {
   let body = document.querySelector('header')
   let boardDiv = document.createElement('div')
   boardDiv.id = `board ${board.id}`
   boardDiv.classList.add('hidden')
   let parentDiv = document.querySelector('.theBoard')
  //adding list form to the board so users can create new lists.
  let listForm = document.querySelector('.list_form')
  let newListForm = listForm.cloneNode(true);
    
    parentDiv.append(newListForm)
    newListForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newList = e.target.childNodes[4].value
    postList(newList, boardDiv)})




  //button to display the board
  let boardButton = document.createElement('button')
  boardButton.innerText = board.name
  body.append(boardButton, boardDiv)

  //display the board's lists when clicked
  boardButton.addEventListener('click', () =>{
  let activeBoard = document.querySelector('.activeBoard')
  let theLists = document.getElementsByClassName('.row')

    //checks to see if activeRecord is null, the same as divBoard, or a different divBoard
    if (activeBoard == null)
    {
      newListForm.classList.remove('hidden')
      boardDiv.classList.add('activeBoard')
      boardDiv.classList.remove('hidden')
      for (list of theLists) {
        if (list.classList.contains(`ofBoard${board.id}`)){
        list.classList.remove('hidden')
        }
        else{
          list.classList.add('hidden')
        }
      }
      
    }
    else if (activeBoard.id == boardDiv.id ) {
      boardDiv.classList.remove('activeBoard')
      boardDiv.classList.add('hidden')
      newListForm.classList.add('hidden')
      for (list of theLists) {
        if (list.classList.contains(`ofBoard${board.id}`)){
          list.classList.add('hidden')
        }
      }
    }
    else if (activeBoard.id != boardDiv.id){
      activeBoard.classList.add('hidden')
      activeBoard.classList.remove('activeBoard')
      boardDiv.classList.remove('hidden')
      boardDiv.classList.add('activeBoard')
      for (list of theLists) {
        if (list.classList.contains(`ofBoard${board.id}`)){
        list.classList.remove('hidden')
        }
        else{
          list.classList.add('hidden')
        }
      }
    }
  })


}

function renderList(list){
    let parentDiv = document.querySelector('.theBoard')
    //let parentDiv = document.getElementById(`board ${list.board_id}`)
      let divRow = document.createElement("div")
      divRow.classList.add('.row', `ofBoard${list.board_id}`)
      let listDiv = document.createElement('div')
      listDiv.classList.add('column', 'card')
       //divColumn.className = 'column'
      // listDiv.className = "card"
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
      divRow.append(listDiv)
      divRow.classList.add('hidden')
      parentDiv.append(divRow)
    }

function renderTask(task){
  let ul = document.getElementById(`list ${task.list_id}`)
  let li = document.createElement('li')
  li.textContent = task.name
  li.className = "list-li"
  //add button to delete li
  let btn = document.createElement('button')
  btn.textContent = 'x'
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
    let element = document.getElementById(list.id)
    element.parentNode.remove()
    fetch(`${BASEURL}/lists/${list.id}`, {
        method: 'DELETE',
    })
    .then(resp => resp.json())

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
function postList(newList, boardDiv) {
  fetch(LISTURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'name': newList,
      'board_id': `${boardDiv.id[6]}`
    })
  })
  .then (res => res.json())
  .then (list => {
    renderList(list)
    let newList = document.getElementById(`${list.id}`)
    newList.parentElement.classList.remove('hidden')

  })
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
