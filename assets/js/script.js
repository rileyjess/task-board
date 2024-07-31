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

// Generate a unique task id
function generateTaskId() {
  let nextId = crypto.randomUUID();

  return nextId;
}

// Create a task card
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

// Render the task list and make cards draggable
function renderTaskList() {
  const tasks = getTasksFromStorage();

  // Clear task cards out of all lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // Create task cards for each status
  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

  // Make task cards draggable with JQuery
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

  // Read user input from the form
  const taskTitle = taskTitleInputEl.val().trim();
  const taskDescription = taskDescriptionInputEl.val().trim();
  const taskDueDate = taskDueDateInputEl.val();

  const newTask = {
    uniqueId: nextId,
    name: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
    status: 'to-do',
  };

  // New tasks will be pushed into an array
  const tasks = getTasksFromStorage();
  tasks.push(newTask);

  // Store the new tasks array in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // The data will be displayed on the screen
  renderTaskList();

  // Clear form inputs
  taskTitleInputEl.val('');
  taskDescriptionInputEl.val('');
  taskDueDateInputEl.val('');
}

// A function to handle deleting a task
function handleDeleteTask(event){
  const taskId = $(this).attr('task-project-id');
  const tasks = getTasksFromStorage();

  // Remove tasks from the array. 
  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  // Save the tasks to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Display the tasks on the screen
  renderTaskList();

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