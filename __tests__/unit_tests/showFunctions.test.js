import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import projectModule from '../../modules/projectModule.js';
import showProjects from "../../utils/showProjects.js";
import showToDos from "../../utils/showToDos.js";
import todoModule from "../../modules/todoModule.js";

describe('showProjects', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body><ul id="project-list"></ul></body></html>');
        document = dom.window.document;

        // Mock des projectModule
        vi.spyOn(projectModule, 'getProjects').mockImplementation(() => [
            { title: 'Project 1' },
            { title: 'Project 2' }
        ]);
    });

    it('should add DOM Elements correctly', () => {
        showProjects(document);  // Übergeben des document Objekts
        console.log(document.body.innerHTML);  // Überprüfen, was aktuell im DOM ist

        const list = document.querySelector('#project-list');
        const items = list.querySelectorAll('li');

        expect(items.length).toBe(2);
        expect(items[0].textContent).toBe('Project 1');
        expect(items[1].textContent).toBe('Project 2');
    });
});

describe('showToDos', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body><div class="toDosContainer"></div></body></html>');
        document = dom.window.document;

        // Mock des projectModule
        vi.spyOn(projectModule, 'getTodos').mockImplementation(() => [
            'todoId1',
            'todoId2'
        ]);

        // Mock des todoModule
        vi.spyOn(todoModule, 'getTodo').mockImplementation((todoId) => {
            if (todoId === 'todoId1') {
                return {
                    title: 'Todo 1',
                    description: 'Description 1',
                    dueDate: '2022-01-01',
                    priority: 'High',
                    notes: 'Notes 1',
                    checklist: ['Item 1', 'Item 2'],
                    completed: false
                };
            } else if (todoId === 'todoId2') {
                return {
                    title: 'Todo 2',
                    description: 'Description 2',
                    dueDate: '2022-02-02',
                    priority: 'Low',
                    notes: 'Notes 2',
                    checklist: ['Item 3', 'Item 4'],
                    completed: true
                };
            }
        });
    });

    it('should add DOM Elements correctly', () => {
        showToDos('projectId', document);  // Übergeben des document Objekts und projectId
        console.log(document.body.innerHTML);  // Überprüfen, was aktuell im DOM ist

        const todoContainer = document.querySelector('.toDosContainer');
        const todoCards = todoContainer.querySelectorAll('.todo-card');

        expect(todoCards.length).toBe(2);

        const todo1 = todoCards[0];
        expect(todo1.querySelector('h3').textContent).toBe('Todo 1');
        expect(todo1.querySelector('p:nth-child(2)').textContent).toBe('Description 1');
        expect(todo1.querySelector('p:nth-child(3)').textContent).toBe('2022-01-01');
        expect(todo1.querySelector('p:nth-child(4)').textContent).toBe('High');
        expect(todo1.querySelector('p:nth-child(5)').textContent).toBe('Notes 1');
        expect(todo1.querySelector('p:nth-child(6)').textContent).toBe('Item 1, Item 2');
        expect(todo1.querySelector('.complete-btn').textContent).toBe('Not Done');
        expect(todo1.querySelector('.complete-btn').style.backgroundColor).toBe('white');
        expect(todo1.querySelector('.delete-btn')).toBeTruthy();

        const todo2 = todoCards[1];
        expect(todo2.querySelector('h3').textContent).toBe('Todo 2');
        expect(todo2.querySelector('p:nth-child(2)').textContent).toBe('Description 2');
        expect(todo2.querySelector('p:nth-child(3)').textContent).toBe('2022-02-02');
        expect(todo2.querySelector('p:nth-child(4)').textContent).toBe('Low');
        expect(todo2.querySelector('p:nth-child(5)').textContent).toBe('Notes 2');
        expect(todo2.querySelector('p:nth-child(6)').textContent).toBe('Item 3, Item 4');
        expect(todo2.querySelector('.complete-btn').textContent).toBe('Done');
        expect(todo2.querySelector('.complete-btn').style.backgroundColor).toBe('green');
        expect(todo2.querySelector('.delete-btn')).toBeTruthy();
    });
})
