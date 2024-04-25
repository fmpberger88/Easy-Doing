import { seedProjects } from "./seed.js";
import projectModule from "./modules/projectModule.js";
import todoModule from "./modules/todoModule.js";
import showProjects from "./utils/showProjects.js";
import showTodos from "./utils/showToDos.js";
import createProject from "./utils/createProject.js";
import createTodo from "./utils/createTodo.js";

export function initializeDragAndDrop() {
    const columns = document.querySelectorAll('.kanban-tasks');
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault(); // Necessary to allow dropping
        });

        document.addEventListener('dragstart', e => {
            if (e.target.classList.contains('draggable')) {
                e.target.classList.add('dragging');
                console.log('Dragging element:', e.target);
            }
        });


        column.addEventListener('drop', e => {
            e.preventDefault();
            console.log('Drop event fired');

            // Use a global selector to ensure you're checking the entire document
            const draggable = document.querySelector('.dragging');
            console.log('Draggable element:', draggable); // Check what this logs

            if (draggable) {
                column.appendChild(draggable);
                draggable.classList.remove('dragging');
                console.log('Dropped into:', column.dataset.status);

                const newStatus = column.dataset.status;
                const todoId = draggable.dataset.todoId;

                // Update the todo's status using the todoModule
                todoModule.updateTodoStatus(todoId, newStatus);
            } else {
                console.error('No draggable element found at drop');
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    if (!projectModule.getProjects().length) {
        seedProjects();
    }

    showProjects(document);
    createProject(document);
    createTodo(document);

    const projectList = document.querySelector('#project-list');
    projectList.addEventListener('click', (event) => {
        const target = event.target.closest('[data-project-id]'); // Use closest to find the nearest parent if needed
        if (target && target.dataset.projectId) {
            showTodos(target.dataset.projectId, document);
            initializeDragAndDrop(); // Reinitialize drag & drop to ensure new todos are draggable
        }
    });

    initializeDragAndDrop(); // Initial call to set up drag & drop
});

