import projectModule from "../modules/projectModule.js";

const showProjects = (document) => {
    const projects = projectModule.getProjects();
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = ''; // Clear existing project list

    projects.forEach(project => {
        const projectElement = document.createElement("li");
        projectElement.textContent = project.title;
        projectElement.dataset.projectId = project.id; // Set data attribute for identification
        projectList.appendChild(projectElement);
    });
}

export default showProjects;
