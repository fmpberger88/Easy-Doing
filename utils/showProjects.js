import projectModule from "../modules/projectModule.js";

const showProjects = (document) => {
    // get all projects
    const projects = projectModule.getProjects();
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement("li");
        projectElement.textContent = project.title;
        // Set data attribute for identification
        projectElement.dataset.projectId = project.id;
        projectList.appendChild(projectElement);
    });
}

export default showProjects;