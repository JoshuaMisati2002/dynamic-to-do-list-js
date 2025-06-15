
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM Elements
    // Select the "Add Task" button by its ID and store it in a constant.
    const addButton = document.getElementById('add-task-btn');
    // Select the input field where users enter tasks by its ID.
    const taskInput = document.getElementById('task-input');
    // Select the unordered list where tasks will be displayed by its ID.
    const taskList = document.getElementById('task-list');

 
    function addTask() {
        const taskText = taskInput.value.trim();

        // Check if the trimmed taskText is empty.
        // If it is, alert the user and stop the function's execution.
        if (taskText === '') {
            alert('Please enter a task!'); // Prompts the user to enter task content.
            return;
        }

        // Task Creation and Removal Logic:

        // 1. Create a new list item (<li>) element to hold the task.
        const listItem = document.createElement('li');
        // Set the text content of the list item to the retrieved task text.
        listItem.textContent = taskText;

        // 2. Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set the text displayed on the remove button.
        removeButton.textContent = 'Remove';
        // Assign a class name to the remove button for styling purposes.
        removeButton.classList.add('remove-btn');

        // 3. Assign an onclick event handler to the remove button.
        
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Removes the <li> element.
        };

        // 4. Append the newly created remove button as a child of the list item.
        listItem.appendChild(removeButton);

        // 5. Append the complete list item (with its text and remove button)
        
        taskList.appendChild(listItem);

        // 6. Clear the task input field, preparing it for the next task entry.
        taskInput.value = '';
    }


    // Add an event listener to the "Add Task" button.
    // When the button is clicked, the addTask function will be executed.
    addButton.addEventListener('click', addTask);

    // Add an event listener to the task input field for the 'keypress' event.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the key pressed is the 'Enter' key.
        if (event.key === 'Enter') {
            addTask(); // Call the addTask function.
        }
    });

    // Invoke the addTask function immediately after the DOM content is loaded.
    addTask();
});


