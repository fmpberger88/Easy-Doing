import projectModule from "../modules/projectModule.js";

const showProjects = (document) => {
    // get all projects
    const projects = projectModule.getProjects();
    projects.forEach(project => {
        const projectElement = document.createElement("li");
        projectElement.textContent = project.title;
        document.querySelector('#project-list').appendChild(projectElement);
    });
}

export default showProjects;