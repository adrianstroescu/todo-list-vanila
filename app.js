// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener('click', (event) => addTodo(event));
todoList.addEventListener('click', (event) => deleteCheck(event));
filterOption.addEventListener('change', (event) => filterTodo(event));


// Functions
const addTodo = (event) => {
    event.preventDefault();

    // Create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create List Item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Local Storare
    saveLocalTodos(todoInput.value);

    // Create Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Create Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to List
    todoList.appendChild(todoDiv);

    // Clear Input Field
    todoInput.value = '';
};

const deleteCheck = (event) => {
    const item = event.target;

    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    }

    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

const filterTodo = (event) => {
    const todos = document.querySelectorAll('.todo'); // Select only the elements with class 'todo'
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'uncompleted':
                todo.style.display = !todo.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
};


const saveLocalTodos = (todo) =>  {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos  = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


const getTodos = () => {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos  = JSON.parse(localStorage.getItem('todos'));
    }
     todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        // Create List Item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    

        // Create Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
    
        // Create Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    
        // Append to List
        todoList.appendChild(todoDiv);
     });
}

const removeLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos  = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


document.addEventListener("DOMContentLoaded", getTodos);
