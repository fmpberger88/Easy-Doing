import { describe, it, expect, beforeEach } from 'vitest';
import todoModule from '../modules/todoModule';
import projectModule from '../modules/projectModule';

describe('Integration between todoModule and projectModule', () => {
    beforeEach(() => {
        // Clear all entries before each test
        localStorage.clear();
        // Reset modules if necessary, depending on how they are implemented
    });

    it('should allow adding todos to a project and retrieve them accurately', () => {
        // Step 1: Create a new project
        projectModule.addProject('Work Project');
        const projects = projectModule.getProjects();
        const projectId = projects[0].id;

        // Step 2: Add todos to the project
        todoModule.addTodo('Finish report', 'Complete the annual report.', '2023-04-15', 'high', 'Include financials', ['Draft', 'Review', 'Finalize']);
        const todo = todoModule.getTodos()[0];

        // Step 3: Add the todo to the project
        projectModule.addTodoToProject(projectId, todo);

        // Step 4: Check that the todo has been added to the project
        const updatedProject = projectModule.getProjects().find(p => p.id === projectId);
        expect(updatedProject.todos).toHaveLength(1);
        expect(updatedProject.todos[0].title).toBe('Finish report');
        expect(updatedProject.todos[0].priority).toBe('high');

        // Additional assertions can be added to verify all aspects of the todo item
    });
});
