# Task Board

## Description
This website is a task board where new tasks can be added and reorganized to measure the progress of a project. When the "Add Task" button is clicked, the user can add a task title, due date, and description. A task card will be generated that will be color coded to indicate whether the deadline is near or overdue: 
    - If the deadline is in the future, the task card will be white. 
    - If the deadline is today, the task card will be yellow. 
    - If the deadline has past, the task card will be red. 

Acceptance Criteria:
- When the user opens the task board, the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
- When the user views the task board for the project, each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
- When the user clicks on the button to define a new task, they can enter the title, description and deadline date for the new task into a modal dialog
- When the user clicks the save button for that task, the properties for that task are saved in localStorage
- When they drag a task to a different progress column, the task's progress state is updated accordingly and will stay in the new column after refreshing
- When the delete button is clicked for a task, the task is removed from the task board and will not be added back after refreshing
- When the page is refreshed, the saved tasks persist

## Website Screenshot


## Deployed Website URL


## Credits
Starter code in the HTML, CSS, and JavaScript files were copied from: https://github.com/coding-boot-camp/musical-happiness

Modal and form components were copied from Bootstrap: https://getbootstrap.com/docs/4.0/components/modal/

The code in the JavaScript functions was pulled from the Module 5 mini project and modified to work for this task board.

## License
MIT License