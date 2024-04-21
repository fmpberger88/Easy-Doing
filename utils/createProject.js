import projectModule from "../modules/projectModule.js";
import showProjects from "./showProjects.js";

const createProject = document => {
    const newProjectButton = document.querySelector('.newProjectButton');

    newProjectButton.addEventListener('click', (e) => {
        const title = prompt('Enter project title:');
        if (title) {
            projectModule.addProject(title);
            showProjects(document);
        }
    })
};

export default createProject;