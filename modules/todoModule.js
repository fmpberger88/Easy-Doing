const todoModules = (() => {
    const STORAGE_KEY = 'todoApp.todo';

    let todoList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const saveToLocalStorage = () => {
        localstorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
    };

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
        }
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
    }

    const deleteTodo = (id) => {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todoList.splice(index, 1);
            saveToLocalStorage();
        }
    }

    return {
        addTodo,
        getTodos,
        completeTodo,
        deleteTodo,
    }
})