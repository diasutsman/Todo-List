const display = document.getElementById('todoList')
const create = document.getElementById('todoCreate')
const btnCreate = document.getElementById('btnSubmit')

const isDuplicate = (todo) => [...document.querySelectorAll('#todoList li')].map(e => e.innerText).some(e => e.toLowerCase() == todo.toLowerCase())

const capitilize = (s) => s[0].toUpperCase() + s.substring(1).toLowerCase()

// prevent the submit button to submit and reload the page
create.addEventListener('submit', (e) => e.preventDefault())

// if button 'add' is clicked
btnCreate.addEventListener('click', () => {
    if(!btnCreate.previousElementSibling.value)alert('Isi dulu bray...')
    else if (isDuplicate(btnCreate.previousElementSibling.value))alert('To Do has been added')
    else display.innerHTML += `<li>${capitilize(btnCreate.previousElementSibling.value)}<input type="button" id="btnRemove" value="Delete"></li>`
    btnCreate.previousElementSibling.value = ''
})

// event bubbling 
display.addEventListener('click', (e) => e.target.id === 'btnRemove'? e.target.parentElement.remove() : undefined)