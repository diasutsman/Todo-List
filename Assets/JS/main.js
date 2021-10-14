const display = document.getElementById('todoList')
const create = document.getElementById('todoCreate')
const btnCreate = document.getElementById('btnSubmit')

let temp = ''
let editOpen = false
let canDelete = true

const isDuplicate = (todo) => [...document.querySelectorAll('#todoList li span')].map(e => e.innerText).some(e => e.toLowerCase() == todo.toLowerCase())

const capitilize = (s) => s[0].toUpperCase() + s.substring(1).toLowerCase()

// prevent the submit button to submit and reload the page
create.addEventListener('submit', (e) => e.preventDefault())
//document.getElementById('todoEdit').addEventListener('submit', (e) => e.preventDefault())

// if button 'add' is clicked
btnCreate.addEventListener('click', () => {
    if(!btnCreate.previousElementSibling.value)alert('Isi dulu bray...')
    else if (isDuplicate(btnCreate.previousElementSibling.value))alert('To Do has been added')
    else display.innerHTML += `<li>
            <span>${capitilize(btnCreate.previousElementSibling.value)}</span>
            <div>
                <input type="button" id="btnEdit" value="Edit">
                <input type="button" id="btnRemove" value="Delete">
            </div>
        </li>`
    btnCreate.previousElementSibling.value = ''
})

// event bubbling
display.addEventListener('click', (e) => {
    console.log(e.target.id)

    //(DELETE BUTTON)
    if(e.target.id === 'btnRemove' && canDelete)e.target.parentElement.parentElement.remove() 

    //(EDIT BUTTON)
    else if(e.target.id === 'btnEdit' && !editOpen) {
        temp = e.target.parentElement.previousElementSibling.innerText
        e.target.parentElement.parentElement.innerHTML = `
            <input type="text" value="${e.target.parentElement.previousElementSibling.innerText}" id="editString" autofocus>
            <div>
                <input type="submit" id="btnSave" value="Save">
                <input type="button" id="btnCancel" value="Cancel">
            </div>
        `
        document.querySelectorAll('#btnEdit').forEach(e => {e.style.filter = 'grayscale(500%)';e.style.opacity = '.5';e.style.cursor = 'default'})
        document.querySelectorAll('#btnRemove').forEach(e => {e.style.filter = 'grayscale(500%)';e.style.opacity = '.5';e.style.cursor = 'default'})
        editOpen = true
        canDelete = false
    }

    // (Save Button)
    else if(e.target.id === 'btnSave') {
        if(isDuplicate(e.target.parentElement.previousElementSibling.value))alert('To Do has been added')
        else e.target.parentElement.parentElement.innerHTML = `
            <span>${capitilize(e.target.parentElement.previousElementSibling.value)}</span>
            <div>
                <input type="button" id="btnEdit" value="Edit">
                <input type="button" id="btnRemove" value="Delete">
            </div>
        ` 
        document.querySelectorAll('#btnEdit').forEach(e => {e.style.filter = '';e.style.opacity = '';e.style.cursor = 'pointer'})
        document.querySelectorAll('#btnRemove').forEach(e => {e.style.filter = '';e.style.opacity = '';e.style.cursor = 'pointer'})
        editOpen = false
        canDelete = true
    }

    // (Cancel button)
    else if(e.target.id === 'btnCancel') {
        e.target.parentElement.parentElement.innerHTML = `
            <span>${capitilize(temp)}</span>
            <div>
                <input type="button" id="btnEdit" value="Edit">
                <input type="button" id="btnRemove" value="Delete">
            </div>
        `
        document.querySelectorAll('#btnEdit').forEach(e => {e.style.filter = '';e.style.opacity = '';e.style.cursor = 'pointer'})
        document.querySelectorAll('#btnRemove').forEach(e => {e.style.filter = '';e.style.opacity = '';e.style.cursor = 'pointer'})
        editOpen = false
        canDelete = true
    }
})