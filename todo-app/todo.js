let toDos = getSavedTodos()
let search = ""
let hide = false

renderTodos()

document.querySelector("#filter").addEventListener("input", function(e) {
    search = e.target.value
    renderTodos()
})

document.querySelector("#add-todo").addEventListener("submit", function(e) {
    e.preventDefault()
    toDos.push({id: uuidv4(), text: e.target.elements.newTodo.value, complete: false})
    e.target.elements.newTodo.value = ''
    saveTodos()
    renderTodos()
})

document.querySelector("#hide-completed").addEventListener("change", function(e) {
    hide = e.target.checked
    renderTodos()
})
