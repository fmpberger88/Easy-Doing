import projectModule from "./modules/projectModule.js";
import todoModule from "./modules/todoModule.js";

export function seedProjects() {
    const projects = [
        { title: 'Develop fancy App' },
        { title: 'Make food' }
    ];

    projects.forEach((project, index) => {
        const createdProject = projectModule.addProject(project.title);
        if (index === 0) {
            seedTodos(createdProject.id, ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4']);
        } else if (index === 1) {
            seedTodos(createdProject.id, ['Todo 5', 'Todo 6']);
        }
    });
}

function seedTodos(projectId, todoTitles) {
    todoTitles.forEach((title, index) => {
        const createdTodo = todoModule.addTodo(
            title,
            `Test description for ${title}`,
            `2022-01-0${index + 1}`,
            'High',
            '',
            [],
            projectId
        );

        // Now, add the todo ID to the project
        projectModule.addTodoToProject(projectId, createdTodo.id);
    });
}
