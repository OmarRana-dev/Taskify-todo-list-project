import { addProject_UI, addTask_UI } from "./UI.js";
import { creatTask, editTask } from "./task.js";
import { createProject } from "./project.js";
import {
  // addActiveClsToSelectedProject,
  appendTaskToParent,
  addActiveClsToNewlyAddedProject,
  addEditedTaskAtStorage,
  getTaskWithIDforEdit,
  UpdateUI,
} from "./backend.js";
import { addToLocalStorage, getToLoclStorage } from "./localStorage.js";
import { addActiveClsToTaskForEdit } from "./taskEditor.js";

// project name getter form script
function openDialog_p() {
  document.querySelector("#projectTitle").value = "";

  const dialog = document.querySelector("#projectNameGetterForm");
  dialog.showModal();
}
const submitProject = document.querySelector("#submitProject");
submitProject.addEventListener("click", projectNameGetter);

function projectNameGetter() {
  const inputName = document.querySelector("#projectTitle");
  const name = inputName.value.trim();

  addProjectToUIIfValid(name);
}

function addProjectToUIIfValid(name) {
  if (!name) {
    console.log("Give a Name to Project.");
  } else {
    const project = createProject(name);

    const dataHolder = getToLoclStorage();
    dataHolder.push(project);
    addToLocalStorage(dataHolder);

    console.log(getToLoclStorage());
    // UpdateUI()
    addProject_UI(project.projectName, project.id);
    addActiveClsToNewlyAddedProject(project.id);
  }
}

// Task info getter form section script
function openDialog_t() {
  clearForm();

  console.log("open Dialog");
  const dialog = document.querySelector("#taskInfoGetterForm");
  dialog.showModal();
}

function clearForm() {
  document.querySelectorAll("input").forEach((element) => {
    element.value = "";
  });
  document.querySelector("#taskCheckBox").checked = false;
}

const submitTaskBtn = document.querySelector("#submitTask");
submitTaskBtn.addEventListener("click", taskInfoGetter);

function taskInfoGetter() {
  console.log("set the task new");
  const title = document.querySelector("#taskTitle").value.trim();
  const description = document.querySelector("#taskDiscription").value.trim();
  const dueDate = document.querySelector("#taskDueDate").value;
  const isImportant = document.querySelector("#taskCheckBox").checked;

  console.log("at getter");
  addTaskToUIIfValid(title, description, dueDate, isImportant);
}

function addTaskToUIIfValid(title, description, dueDate, isImportant) {
  if (!title) {
    console.log("title needed");
    return;
  } else {
    const activeProject = document.querySelector(".activeProject");
    const projectID = activeProject.id;
    const projectName = activeProject.innerHTML;
    const task = creatTask(projectID, title, description, dueDate, isImportant);

    console.log("at task form adder");
    addTask_UI(task);
    appendTaskToParent(projectID, projectName, task);

    // addActiveClsToSelectedProject();
    addActiveClsToTaskForEdit();
  }
}

// Update Task
function updateTask() {
  const dialog = document.querySelector("#taskEditorForm");
  dialog.showModal();
}
console.log("Updated Task edit");
const UpdateTask = document.querySelector("#taskUpdate");
UpdateTask.addEventListener("click", getUpdatedInfoOfTask);

function getUpdatedInfoOfTask() {
  console.log("Updated Task edit");
  const editedTask = document.querySelector("#editTaskTitle").value.trim();
  const editedDescription = document
    .querySelector("#editTaskDescription")
    .value.trim();
  const editedDueDate = document.querySelector("#editTaskDueDate").value.trim();

  setUpdatedTaskInfo(editedTask, editedDescription, editedDueDate);
}

function setUpdatedTaskInfo(editedTask, editedDescription, editedDueDate) {
  const activeTask = document.querySelector(".activeTask");

  const taskData = getTaskWithIDforEdit(activeTask.id);

  const title = editedTask || taskData.title;
  const description = editedDescription || taskData.description;
  const dueDate = editedDueDate || taskData.dueDate;

  const updatedValues = editTask(title, description, dueDate);
  console.log(updatedValues);

  addEditedTaskAtStorage(activeTask.id, updatedValues);

  appendUpdatedInfoAtUI(activeTask.id);
}

function appendUpdatedInfoAtUI(id) {
  const updatedTask = getTaskWithIDforEdit(id);

  const appendUpdatedHeaderAtUI = document.querySelector(
    ".activeTask>.task-left-side>.taskNameDescriptionContainer>.taskHeader"
  );
  const appendUpdatedDescriptionAtUI = document.querySelector(
    ".activeTask>.task-left-side>.taskNameDescriptionContainer>.taskDiscription"
  );
  const appendUpdatedDueDateAtUI = document.querySelector(
    ".activeTask>.task-right-side>.taskDate"
  );

  appendUpdatedHeaderAtUI.textContent = updatedTask.title;
  appendUpdatedDescriptionAtUI.textContent = updatedTask.description;
  appendUpdatedDueDateAtUI.textContent = updatedTask.dueDate;
}

export { openDialog_p, openDialog_t, updateTask };
