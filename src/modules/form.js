import { addProject_UI, addTask_UI } from "./UI.js";
import { Task, creatTask } from "./task.js";
import { Project, createProject } from "./project.js";
import {
  getActiveProject,
  showAddTaskBtn,
  defaultProjects,
  UpdateUI,
  addGetActive,
  appendTaskToParent,
} from "./backend.js";

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
    console.log(project);
    defaultProjects.push(project);
    console.log(defaultProjects);
    UpdateUI();
    addGetActive();
  }
}

// Task info getter form section script
function openDialog_t() {
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
  //   console.log("hi");
  const title = document.querySelector("#taskTitle").value.trim();
  const description = document.querySelector("#taskDiscription").value.trim();
  const dueDate = document.querySelector("#taskDueDate").value.trim();
  const isImportant = document.querySelector("#taskCheckBox").checked;

  addTaskToUIIfValid(title, description, dueDate, isImportant);
}

function addTaskToUIIfValid(title, description, dueDate, isImportant) {
  if (!title) {
    console.log("title needed");
    return;
  } else {
    const task = creatTask(title, description, dueDate, isImportant);
    // console.log(task);
    const activeProject = document.querySelector(".activeProject");
    const projectID = activeProject.id;
    const projectName = activeProject.innerHTML;
    // console.log(projectName);

    appendTaskToParent(projectID, projectName, task);
    UpdateUI();
    console.log(defaultProjects);
  }
}

export { openDialog_p, openDialog_t };
