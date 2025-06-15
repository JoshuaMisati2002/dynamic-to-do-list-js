
document.addEventListener('DOMContentLoaded', () => {
    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get and trim the task input value
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user and return
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Set up the removal functionality
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Add the complete list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add click event to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add keypress event to the input to listen for "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Optional: Call addTask on DOM load if you want default tasks (currently no default call)
    // addTask(); // <- Uncomment only if you want to pre-populate a task
});
