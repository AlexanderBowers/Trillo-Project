const BASEURL = 'http://localhost:3000'
const BOARDURL = `${BASEURL}/boards`
const LISTURL = `${BASEURL}/lists`
const TASKURL = `${BASEURL}/tasks`

document.addEventListener("DOMContentLoaded", () => {
  fetchBoards();
  fetchList();
  setTimeout(() => { fetchTasks()}, 3);
});

// fetch functions
function fetchBoards() {
  fetch(`${BASEURL}/boards`)
  .then (res => res.json())
  .then (board => renderBoard(board))
}

function fetchList() {
  fetch(`${BASEURL}/lists`)
  .then (res => res.json())
  .then (lists => lists.forEach((list) => {renderList(list)}))
}

function fetchTasks() {
    fetch(`${BASEURL}/tasks`)
    .then(resp => resp.json())
    .then(tasks => tasks.forEach((task) => renderTask(task)))
}



// render functions
function renderBoard(board) {
  let div = document.querySelector(".theBoard")
  let h2 = document.createElement('h2')
  h2.textContent = board[0].name
  div.append(h2)
}

function renderList(list){
  let board = document.querySelector(".theBoard")
  let listDiv = document.createElement('div')
  listDiv.classList.add('theList')
  listDiv.id = list.id

  let h6 = document.createElement('h6')
  h6.textContent = list.name

  //add button to delete list
  let btn = document.createElement('button')
  btn.textContent = 'delete list'
  btn.addEventListener('click', (e) => {
    e.preventDefault()  
    deleteList(list)
    listDiv.remove()})
 
  let ul = document.createElement('ul')
  ul.id = `list ${list.id}`

  h6.appendChild(btn)
  listDiv.append(h6, ul)
  board.append(listDiv)
  
}

function renderTask(task){
  let ul = document.getElementById(`list ${task.list_id}`)
  let li = document.createElement('li')
  li.textContent = task.name

  //add button to delete li
  let btn = document.createElement('button')
  btn.textContent = 'X'
  btn.addEventListener('click', (e) => {
      e.preventDefault()
      deleteTask(task)
      li.remove()})

  li.appendChild(btn)
  ul.appendChild(li)
}

//delete functions
function deleteList(list){
    fetch(`${BASEURL}/lists/${list.id}`, {
        method: 'DELETE',
    }).then(resp => resp.json())
}
function deleteTask(task){
    fetch(`${BASEURL}/tasks/${task.id}`, {
        method: 'DELETE',
    }).then(resp => resp.json())
}