import { seedProjects } from "./seed.js";
import projectModule from "./modules/projectModule.js";
import todoModule from "./modules/todoModule.js";
import showProjects from "./utils/showProjects.js";
import showTodos from "./utils/showToDos.js"; // Import the new module

if (!projectModule.getProjects().length) {
    seedProjects();
}

showProjects(document);

// Adding event listeners to project list items for displaying todos
const projectList = document.querySelector('#project-list');
projectList.addEventListener('click', (event) => {
    const projectId = event.target.dataset.projectId;
    if (projectId) {
        showTodos(projectId, document);
    }
})