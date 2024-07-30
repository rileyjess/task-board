// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let addTaskBtn = $('#btn-success');
const taskTitleInputEl = $('#taskTitle');
const taskDueDateInputEl = $('#taskDueDate');
const taskDescriptionInputEl = $('#taskDescription');

// If no tasks were retrieved, tasks will go into an empty array
function getTasksFromStorage() {

    if (!taskList) {
      tasks = [];
    }
  
    return tasks;
  }

// Todo: create a function to generate a unique task id
function generateTaskId(event) {
    event.preventDefault();

    // Read user input from the form
    const taskTitle = taskTitleInputEl.val().trim();
    const taskDescription = taskDescriptionInputEl.val().trim();
    const taskDueDate = taskDueDateInputEl.val();
  
    const newTask = {
      // Generate a unique id with crypto WebAPI
      nextId: crypto.randomUUID(),
      name: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      status: 'to-do',
    };
  
    // New tasks will be pushed into an array
    const tasks = getTasksFromStorage();
    tasks.push(newTask);
  
    // Store the new tasks array in localStorage
    saveTasksToStorage(tasks);
  
    // The data will be displayed on the screen
    displayTaskData();
  
    // Clear form inputs
    taskTitleInputEl.val('');
    taskDescriptionInputEl.val('');
    taskDueDateInputEl.val('');
  
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
     .addClass('card task-card draggable my-3')
     .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
     .addClass('btn btn-danger delete')
     .text('Delete')
     .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

  // If the task is not marked as done, background color styles will be applied based on the due date
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // The card will be yellow if the due date is today. The card will be red if the task is overdue.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }}

  // All the elements just created will be appended together
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // Initialize the date picker
    $( "#taskDueDate" ).datepicker({
        changeMonth: true,
        changeYear: true
      });
});