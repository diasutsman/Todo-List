const display = document.getElementById('todoList')
const create = document.getElementById('todoCreate')
const btnCreate = document.getElementById('btnSubmit')
const isDuplicate = (todo) => [...document.querySelectorAll('#todoList li span')].map(e => e.innerText).some(e => e.toLowerCase() == todo.toLowerCase())
if(!localStorage['maxID'])localStorage['maxID'] = 1
let temp = ''
let editOpen = false
let canDelete = true

// display item from localStorage
for(const i of Object.keys(localStorage).sort((a , b) => parseInt(a.substring(4)) - parseInt(b.substring(4)))) {
    console.log(i)
    if(i != 'maxID')
        display.innerHTML += `<li>
        <span>${capitilize(localStorage.getItem(i))}</span>
        <div>
        <input type="button" id="btnEdit" value="Edit" class=${i}>
        <input type="button" id="btnRemove" value="Delete" class=${i}>
        </div>
        </li>`
}

function capitilize(s) {return s[0].toUpperCase() + s.substring(1).toLowerCase()}


const resetButtonStyle = () => {
    document.querySelectorAll('#btnEdit').forEach(e => {e.style.filter = '';e.style.opacity = '1';e.style.cursor = 'pointer'})
    document.querySelectorAll('#btnRemove').forEach(e => {e.style.filter = '';e.style.opacity = '1';e.style.cursor = 'pointer'})
    editOpen = false
    canDelete = true
}

const disabledButtonStyle = () => {
    document.querySelectorAll('#btnEdit').forEach(e => {e.style.filter = 'grayscale(500%)';e.style.opacity = '.5';e.style.cursor = 'default'})
    document.querySelectorAll('#btnRemove').forEach(e => {e.style.filter = 'grayscale(500%)';e.style.opacity = '.5';e.style.cursor = 'default'})
    editOpen = true
    canDelete = false
}

// prevent the submit button to submit and reload the page
create.addEventListener('submit', (e) => e.preventDefault())
//document.getElementById('todoEdit').addEventListener('submit', (e) => e.preventDefault())

// if button 'add' is clicked
btnCreate.addEventListener('click', () => {
    if(!btnCreate.previousElementSibling.value)alert('Isi dulu bray...')
    else if (isDuplicate(btnCreate.previousElementSibling.value))alert('To Do has been added')
    else {
        display.innerHTML += `<li>
            <span>${capitilize(btnCreate.previousElementSibling.value)}</span>
            <div>
                <input type="button" id="btnEdit" value="Edit" class="todo${localStorage.getItem('maxID')}">
                <input type="button" id="btnRemove" value="Delete" class="todo${localStorage.getItem('maxID')}">
            </div>
        </li>`
        localStorage[`todo${localStorage.getItem('maxID')}`] = btnCreate.previousElementSibling.value.toLowerCase()
        localStorage["maxID"]++
    }
    btnCreate.previousElementSibling.value = ''
})

// event bubbling
display.addEventListener('click', (e) => {
    //console.log(e.target.id)

    //(DELETE BUTTON)
    if(e.target.id === 'btnRemove' && canDelete){
        localStorage.removeItem(e.target.getAttribute('class'))
        e.target.parentElement.parentElement.remove()
    }   

    //(EDIT BUTTON)
    else if(e.target.id === 'btnEdit' && !editOpen) {
        temp = e.target.parentElement.previousElementSibling.innerText
        e.target.parentElement.parentElement.innerHTML = `
            <input type="text" value="${e.target.parentElement.previousElementSibling.innerText}" id="editString" autofocus>
            <div>
                <input type="submit" id="btnSave" value="Save" class=${e.target.getAttribute('class')}>
                <input type="button" id="btnCancel" value="Cancel" class=${e.target.getAttribute('class')}>
            </div>
        `
        disabledButtonStyle()
    }

    // (Save Button)
    else if(e.target.id === 'btnSave') {
        if(isDuplicate(e.target.parentElement.previousElementSibling.value))alert('To Do has been added')
        else {
            localStorage.setItem(e.target.getAttribute('class'), e.target.parentElement.previousElementSibling.value.toLowerCase())
            e.target.parentElement.parentElement.innerHTML = `
            <span>${capitilize(e.target.parentElement.previousElementSibling.value)}</span>
            <div>
                <input type="button" id="btnEdit" value="Edit" class=${e.target.getAttribute('class')}>
                <input type="button" id="btnRemove" value="Delete" class=${e.target.getAttribute('class')}>
            </div>
            `
        }
        resetButtonStyle()
    }

    // (Cancel button)
    else if(e.target.id === 'btnCancel') {
        e.target.parentElement.parentElement.innerHTML = `
            <span>${capitilize(temp)}</span>
            <div>
                <input type="button" id="btnEdit" value="Edit" class=${e.target.getAttribute('class')}>
                <input type="button" id="btnRemove" value="Delete" class=${e.target.getAttribute('class')}>
            </div>
        `
        resetButtonStyle()
    }
})