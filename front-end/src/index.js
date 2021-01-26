const BASEURL = 'http://localhost:3000'
const LISTURL = `${BASEURL}/lists`
const TASKURL = `${BASEURL}/tasks`
const BOARDURL = `${BASEURL}/boards`

document.addEventListener("DOMContentLoaded", () => {
    fetchBoards();
  });
  function fetchBoards() {
    fetch(`${BASEURL}/boards`)
    .then (res => res.json())
    .then (board => renderBoard(board))
  }
  function renderBoard(board) {
    let div = document.querySelector("main")
    let h3 = document.createElement('h3')
    h3.textContent = board[0].name
    main.append(h3)
  }