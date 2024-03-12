import { format } from "date-fns";
import { addTaskToUI } from "./UI";
import { creatTask, editTask } from "./task";
import { createProject } from "./project";
import {
  appendTaskToParent,
  addEditedTaskAtStorage,
  getTaskWithIDforEdit,
} from "./backend";
import { addToLocalStorage, getToLoclStorage } from "./localStorage";
import { showAllTask } from "./homeFeaturesFun";

// project name getter form script
function openDialogForProject() {
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
    console.error("Give a Name to Project.");
  } else {
    const project = createProject(name);

    const dataHolder = getToLoclStorage();
    dataHolder.push(project);
    addToLocalStorage(dataHolder);

    // console.log(getToLoclStorage());
    showAllTask();
  }
}

// Task info getter form section script
function openDialogForTask() {
  clearForm();

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
  const title = document.querySelector("#taskTitle").value.trim();
  const description = document.querySelector("#taskDiscription").value.trim();
  const dueDate = document.querySelector("#taskDueDate").value;
  const isImportant = document.querySelector("#taskCheckBox").checked;

  addTaskToUIIfValid(title, description, dueDate, isImportant);
}

function addTaskToUIIfValid(title, description, dueDate, isImportant) {
  if (title || dueDate) {
    const activeProject = document.querySelector(".activeProject");
    const projectID = activeProject.id;
    const projectName = activeProject.innerHTML;
    const task = creatTask(projectID, title, description, dueDate, isImportant);

    addTaskToUI(task);
    appendTaskToParent(projectID, projectName, task);
  }
}

// Update Task use when we edit the task
function updateTask() {
  clearForm();

  const dialog = document.querySelector("#taskEditorForm");
  dialog.showModal();
}

const UpdateTask = document.querySelector("#taskUpdate");
UpdateTask.addEventListener("click", getUpdatedInfoOfTask);

function getUpdatedInfoOfTask() {
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
  // console.log(updatedValues);

  addEditedTaskAtStorage(activeTask.id, updatedValues);

  appendUpdatedInfoAtUI(activeTask.id);
}

function appendUpdatedInfoAtUI(id) {
  const updatedTask = getTaskWithIDforEdit(id);

  const appendUpdatedHeaderAtUI = document.querySelector(
    ".activeTask>.task-left-side>.taskNameDescriptionContainer>.taskHeader",
  );
  const appendUpdatedDescriptionAtUI = document.querySelector(
    ".activeTask>.task-left-side>.taskNameDescriptionContainer>.taskDiscription",
  );
  const appendUpdatedDueDateAtUI = document.querySelector(
    ".activeTask>.task-right-side>.taskDate",
  );

  const dueDate = format(updatedTask.dueDate, "eee-d-MMM-yyyy");

  appendUpdatedHeaderAtUI.textContent = updatedTask.title;
  appendUpdatedDescriptionAtUI.textContent = updatedTask.description;
  appendUpdatedDueDateAtUI.textContent = dueDate;
}

export { openDialogForProject, openDialogForTask, updateTask };
