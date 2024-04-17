import todoModule from "../modules/todoModule.js";

const showTodos = (projectId, document) => {
    const todos = todoModule.getTodos(projectId); // Ensure this returns an array of todo objects
    const todoContainer = document.querySelector('.toDosContainer');
    todoContainer.innerHTML = ''; // Clear previous todos

    todos.forEach(todo => {
        if (todo) { // Check if todo is not undefined
            const todoElement = document.createElement('div');
            todoElement.className = 'toDoCard';
            todoElement.innerHTML = `
                <h3>${todo.title || 'No Title'}</h3>
                <p>${todo.description || 'No Description'}</p>
                <p>Due: ${todo.dueDate || 'No Due Date'}</p>
                <p>Priority: ${todo.priority || 'No Priority'}</p>
                <p>ProjectId: ${todo.projectId}</p>
            `;
            todoContainer.appendChild(todoElement);
        } else {
            console.error('Todo is undefined', todo);
        }
    });
}

export default showTodos;
