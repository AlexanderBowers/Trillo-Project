const BASEURL = 'http://localhost:3000'
const BOARDURL = `${BASEURL}/boards`
const LISTURL = `${BASEURL}/lists`
const TASKURL = `${BASEURL}/tasks`

document.addEventListener("DOMContentLoaded", () => {
  fetchBoards();
  fetchList();
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


// render functions
function renderBoard(board) {
  let div = document.querySelector(".theBoard")
  let h2 = document.createElement('h2')
  h2.textContent = board[0].name
  div.append(h2)
}

function renderList(list){
  let div = document.querySelector(".theList")
  let h6 = document.createElement('h6')
  h6.textContent = list.name
  let button = document.createElement('button')

  div.append(h6)
}
