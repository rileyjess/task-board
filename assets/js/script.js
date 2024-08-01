// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTaskBtn = $('#add-task-form');
const deleteTaskBtn = $('#delete-task-btn');
const taskTitleInputEl = $('#taskTitle');
const taskDueDateInputEl = $('#taskDueDate');
const taskDescriptionInputEl = $('#taskDescription');

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
    .addClass('btn btn-danger delete task-delete-btn')
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
    }
  }

  // All the elements just created will be appended together
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

// Render the task list and make cards draggable
function renderTaskList() {
  const tasks = taskList;

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
function handleAddTask(event) {
  event.preventDefault();

  let tasks = taskList;

  // Read user input from the form
  const taskTitle = taskTitleInputEl.val().trim();
  const taskDescription = taskDescriptionInputEl.val().trim();
  const taskDueDate = taskDueDateInputEl.val();

  const newTask = {
    uniqueId: generateTaskId(),
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
    status: 'to-do',
  };

  // New tasks will be pushed into an array
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
function handleDeleteTask(event) {
  const taskId = $(this).attr('task-project-id');
  const tasks = taskList;

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

// A function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

  let tasks = taskList;

  // Retrieve the task id
  const taskId = ui.draggable[0].dataset.taskId;

  // Find the id of the lane that the card was dropped into
  const newTaskStatus = event.target.id;

  for (let task of tasks) {
    // Update the task status
    if (task.id === taskId) {
      task.status = newTaskStatus;
    }
  }
  // Save the new task to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  // Render the task list
  renderTaskList();

  // Add event listeners
  addTaskBtn.on('submit', handleAddTask);

  addTaskBtn.on ('submit', function() {
    $('#formModal').modal('hide');
    return false;
  })

  deleteTaskBtn.on('click', handleDeleteTask);

  // Initialize the date picker
  $("#taskDueDate").datepicker({
    changeMonth: true,
    changeYear: true
  });

  // The lanes are droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

});