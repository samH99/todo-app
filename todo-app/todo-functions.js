function getSavedTodos() {
    const toDosJSON = localStorage.getItem('todos')
    try{
        if(toDosJSON != null){
            return JSON.parse(toDosJSON)
        } else {
            return []
        }
    } catch (e){
        return []
    }
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(toDos))
}

function checkTodo(chk, e) {
    index = toDos.findIndex(td => td.id == chk)
    toDos[index].complete = e
}

function removeTodo(rmv) {
    index = toDos.findIndex(td => td.id == rmv)
    toDos.splice(index, 1)
}

function renderTodos() {
    document.querySelector("#displayed-todos").innerHTML = ""
    toDos.forEach(function(td) {
        if(td.text.toLowerCase().includes(search.toLowerCase()) && !(hide && td.complete)){
            document.querySelector("#displayed-todos").appendChild(generateTodoDOM(td))
        }
    })
    generateSummaryDOM()
}

function generateTodoDOM(td) {
    let todiv = document.createElement("div")
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = td.complete
    checkbox.addEventListener("change", (e) => {
        checkTodo(td.id, e.target.checked)
        saveTodos()
        renderTodos()
    })

    let todotext = document.createElement("span")
    todotext.textContent = td.text
    let button = document.createElement("button")
    button.textContent = "X"
    button.addEventListener("click", () => {
        removeTodo(td.id)
        saveTodos()
        renderTodos()
    })

    todiv.appendChild(checkbox)
    todiv.appendChild(todotext)
    todiv.appendChild(button)
    
    return todiv
}

function generateSummaryDOM() {
    let left = toDos.filter(function(td){return !td.complete}).length
    document.querySelector("#todos-left").innerHTML = ""
    let todo = document.createElement("h2")
    todo.textContent = `You have ${left} thing(s) left to do.`
    document.querySelector("#todos-left").appendChild(todo)
}