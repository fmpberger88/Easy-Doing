import { v4 as uuidv4 } from 'uuid';
/**
 * todoModules - A module for managing todo items.
 *
 * @module todoModules
 */
const todoModules = (() => {
    const STORAGE_KEY = 'todoApp.todo';

    let todoList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    /**
     * Saves the todoList to the local storage using the provided key.
     *
     * @function saveToLocalStorage
     * @returns {void}
     */
    const saveToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
    };

    const addTodo = (title, description, dueDate, priority, notes, checklist, projectId) => {
        const todo = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            priority,
            notes,
            checklist,
            projectId,
            completed: false
        };
        todoList.push(todo);
        saveToLocalStorage();

        return todo;
    };

    const getTodos = () => todoList;

    const completeTodo = (id) => {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todoList[index].completed = true;
            saveToLocalStorage();
        }
    };

    const deleteTodo = (id) => {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todoList.splice(index, 1);
            saveToLocalStorage();
        }
    };

    return {
        addTodo,
        getTodos,
        completeTodo,
        deleteTodo,
    };
})();

export default todoModules;