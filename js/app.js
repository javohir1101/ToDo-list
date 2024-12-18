const formCreate = document.getElementById('form-create');
const formEdit = document.getElementById('form-edit');
const listGroupTodo = document.getElementById('list-group-todo');
const time = document.getElementById('time');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

const fullDay = document.getElementById('full-day');
const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');
const secondEl = document.getElementById('second');
const closeEl = document.getElementById('close')

let editItemId;

// check -->> convert string to array

let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [];

if (todos.length) showTodos();

// setTodos to Localstorage-->> localStorage can accepcts only string values.
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos));
}

// month

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

// time

function getTime() {
    const now = new Date();
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
    const year = now.getFullYear();

    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    fullDay.textContent = `${date} ${months[month - 1]}, ${year}`;

    hourEl.textContent = hour;
    minuteEl.textContent = minute;
    secondEl.textContent = second;

    return `${hour}:${minute}, ${date}.${month}.${year}`;
}

setInterval(getTime, 1000);  // -->> time and date update every second

// show todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'));
    listGroupTodo.innerHTML = '';
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
    <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.completed == true ? 'complated' : ''}">
        ${item.text}
        <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick=(editTodo(${i})) src="./img/edit.svg" alt="edit icon" width="25" height="25" />
            <img onclick=deleteTodo(${i}) src="./img/delete.svg" alt="delete icon" width="25" height="25" />
        </div>
    </li>
    `;
    });
}

// show error    -->> This code is used to temporarily display error or warning texts.
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message;

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = '';
    }, 2500);
}

// get Todos

formCreate.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoText = formCreate['input-create'].value.trim();
    formCreate.reset();

    if (todoText.length) {
        todos.push({ text: todoText, time: getTime(), completed: false });
        setTodos();
        showTodos();
    } else {
        showMessage('message-create', 'Please, Enter some todo..');
    }
});


// delete todo

function deleteTodo(id) {
    const deletedTodos = todos.filter((item, i) => {
        return i !== id
    })

    todos = deletedTodos
    setTodos()
    showTodos()
}

// setCompleted

function setCompleted(id) {

    const completedTodos = todos.map((item, i) => {
        if (id == i) {
            return { ...item, completed: item.completed == true ? false : true }
        } else {
            return { ...item }
        }
    })

    todos = completedTodos
    setTodos()
    showTodos()

}

//edit Form

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formEdit['input-edit'].value.trim();
    formEdit.reset();

    if (todoText.length) {
        todos.splice(editItemId, 1, {
            text: todoText,
            time: getTime(),
            completed: false,
        });
        setTodos();
        showTodos();
        close();
    } else {
        showMessage('message-edit', 'Please, Enter some todo..');
    }
})

//editTodo

function editTodo(id) {
    open()
    editItemId = id
}

// call function, when click the window and x

overlay.addEventListener('click', close)  // -->> window
closeEl.addEventListener('click', close)  // -->> x

// click the esc button

document.addEventListener('keydown', (e) => {
    if(e.which == 27){
        close()
    } 
}) 

function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

// -->> edit saveChanges button

function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}