import todoModule from "../modules/todoModule.js";
import projectModule from "../modules/projectModule.js";

const showTodos = (projectId, document) => {
    const projectTodos = projectModule.getTodos(projectId);
    const todoContainer = document.querySelector('.toDosContainer');
    todoContainer.innerHTML = '';  // Clearing this way is usually okay since it's just removing elements.

    projectTodos.forEach(todoId => {
        const todo = todoModule.getTodo(todoId);
        if (!todo) return;  // Guard clause if todo is undefined

        // Create the todo card and all nested elements
        const todoCard = document.createElement('div');
        todoCard.classList.add('todo-card');

        const title = document.createElement('h3');
        title.textContent = todo.title;

        const description = document.createElement('p');
        description.textContent = todo.description;

        const dueDate = document.createElement('p');
        dueDate.textContent = todo.dueDate;

        const priority = document.createElement('p');
        priority.textContent = todo.priority;

        const notes = document.createElement('p');
        notes.textContent = todo.notes;

        const checklist = document.createElement('p');
        checklist.textContent = todo.checklist.join(", ");  // Assuming checklist is an array

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.textContent = todo.completed ? 'Done' : 'Not Done';
        completeBtn.style.backgroundColor = todo.completed ? 'green' : 'white';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'X';

        // Append all elements to the todo card
        todoCard.append(title, description, dueDate, priority, notes, checklist, completeBtn, deleteBtn);
        todoContainer.appendChild(todoCard);
    })
}

export default showTodos;
