// Ensure all JavaScript code runs only after the entire HTML document has been fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM Elements
    // Select the "Add Task" button by its ID and store it in a constant.
    const addButton = document.getElementById('add-task-btn');
    // Select the input field where users enter tasks by its ID.
    const taskInput = document.getElementById('task-input');
    // Select the unordered list where tasks will be displayed by its ID.
    const taskList = document.getElementById('task-list');

    // Declare a mutable array to hold all tasks. This array will be synchronized with Local Storage.
    let tasks = [];

    /**
     * Helper function to create a new list item (<li>) element for a task
     * and append it to the DOM. It also sets up the remove button.
     * @param {string} taskText - The text content of the task.
     */
    function createTaskElement(taskText) {
        // 1. Create a new list item (<li>) element.
        const listItem = document.createElement('li');
        // Store the original task text as a data attribute on the <li>.
        // This helps in easily identifying and removing the correct task from the 'tasks' array later.
        listItem.setAttribute('data-task-text', taskText);
        // Set the text content of the list item.
        listItem.textContent = taskText;

        // 2. Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Assign a class name for styling.

        // 3. Assign an onclick event handler to the remove button.
        removeButton.onclick = function() {
            // Get the task text from the data attribute of the parent <li> to be removed.
            const taskToRemove = this.parentNode.getAttribute('data-task-text');

            // Remove the <li> element from the DOM (visual removal).
            taskList.removeChild(this.parentNode);

            // Update the global 'tasks' array:
            // Filter out the task that matches the 'taskToRemove' text.
            // This creates a new array without the removed task.
            tasks = tasks.filter(task => task !== taskToRemove);

            // Save the updated 'tasks' array back to Local Storage to ensure persistence.
            saveTasks();
        };

        // 4. Append the remove button to the list item.
        listItem.appendChild(removeButton);
        // 5. Append the complete list item to the unordered task list, making it visible.
        taskList.appendChild(listItem);
    }

    /**
     * Saves the current state of the 'tasks' array to Local Storage.
     * The array is first converted to a JSON string.
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Loads tasks from Local Storage when the page loads.
     * It retrieves stored tasks, parses them, and recreates their DOM elements.
     */
    function loadTasks() {
        // Attempt to retrieve tasks from Local Storage using the key 'tasks'.
        const storedTasks = localStorage.getItem('tasks');

        // Check if any tasks were found in Local Storage.
        if (storedTasks) {
            // Parse the JSON string back into a JavaScript array and assign it to the global 'tasks' array.
            tasks = JSON.parse(storedTasks);
            // Iterate over each loaded task and create its corresponding DOM element to display it on the page.
            tasks.forEach(task => createTaskElement(task));
        }
    }

    /**
     * Defines the addTask function, responsible for handling user input
     * and adding new tasks to both the DOM and Local Storage.
     */
    function addTask() {
        // Retrieve the current value from the task input field and remove leading/trailing whitespace.
        const taskText = taskInput.value.trim();

        // Check if taskText is empty. If so, alert the user and stop.
        if (taskText === '') {
            alert('Please enter a task!'); // In a real app, consider a less intrusive UI message.
            return;
        }

        // Add the new task to the global 'tasks' array.
        tasks.push(taskText);

        // Create and append the task's DOM element to the list.
        createTaskElement(taskText);

        // Save the updated tasks array (including the new task) to Local Storage.
        saveTasks();

        // Clear the task input field, preparing it for the next task entry.
        taskInput.value = '';
        taskInput.focus(); // Keep focus on the input for quicker entry.
    }

    // --- Event Listeners ---

    // Initial load: Call loadTasks() immediately when the DOM content is ready.
    // This populates the list with any tasks saved from previous sessions.
    loadTasks();

    // Add an event listener to the "Add Task" button.
    // When the button is clicked, the addTask function will be executed.
    addButton.addEventListener('click', addTask);

    // Add an event listener to the task input field for the 'keypress' event.
    // This allows users to add a task by pressing the "Enter" key.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the key pressed is the 'Enter' key.
        if (event.key === 'Enter') {
            addTask(); // Call the addTask function.
        }
    });

}); // End of DOMContentL


