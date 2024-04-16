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

    /**
     * Add a new todo to the todo list.
     *
     * @param {string} title - The title of the todo.
     * @param {string} description - The description of the todo.
     * @param {string} dueDate - The due date of the todo.
     * @param {string} priority - The priority of the todo.
     * @param {string} notes - Any additional notes for the todo.
     * @param {Array} checklist - An array representing the checklist items for the todo.
     * @returns {void}
     */
    const addTodo = (title, description, dueDate, priority, notes, checklist) => {
        const todo = {
            id: Date.now(),
            title,
            description,
            dueDate,
            priority,
            notes,
            checklist,
            completed: false
        };
        todoList.push(todo);
        saveToLocalStorage();
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