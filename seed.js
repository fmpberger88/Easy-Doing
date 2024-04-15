import projectModule from "./modules/projectModule.js";
import todoModule from "./modules/todoModule.js";

export function seedProjects() {
    const projects = [
        { title: 'Develop fancy App' },
        { title: 'Make food' }
    ]

    projects.forEach((project, index) => {
        projectModule.addProject(project.title);
        if (index === 0) {
            seedTodos();
        }
    })
}

function seedTodos() {
    const todos = [
        { title: 'Todo 1', description: 'Test', dueDate: '2022-01-01', priority: 'High', notes: '', checklist: [] },
        { title: 'Todo 2', description: 'Test', dueDate: '2022-01-02', priority: 'High', notes: '', checklist: [] },
        // weitere Todos...
    ]

    todos.forEach(todo => {
        todoModule.addTodo(todo.title, todo.description, todo.dueDate, todo.priority, todo.notes, todo.checklist);
    })
}