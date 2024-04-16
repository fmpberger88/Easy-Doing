/**
 * The projectModule is a module that provides functions for managing projects and todos.
 *
 * @namespace projectModule
 */
const projectModule = (() => {
    const STORAGE_KEY = 'projectApp.projects';

    let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const saveToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    const addProject = (title) => {
        const project = {
            id: Date.now(),
            title: title,
            todos: []
        }

        projects.push(project);
        saveToLocalStorage();
    }

    const getProjects = () => projects;

    const addTodoToProject = (projectId, todo) => {
        const index = projects.findIndex(project => project.id === projectId);

        if (index !== -1) {
            projects[index].todos.push(todo);
            saveToLocalStorage();
        }
    }

    const deleteProjects = (projectId) => {
        const index = projects.findIndex(project => project.id === projectId);

        if (index !== -1) {
            projects.splice(index, 1);
            saveToLocalStorage();
        }
    }

    return {
        addProject,
        getProjects,
        addTodoToProject,
        deleteProjects
    }
 })()

export default projectModule;