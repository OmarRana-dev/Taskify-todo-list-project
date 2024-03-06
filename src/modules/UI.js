import { format } from "date-fns";
import { addActiveClsToTaskForEdit } from "./taskEditor.js";

function addProject_UI(name, id) {
  const element = document.createElement("li");
  element.textContent = `${name}`;
  element.setAttribute("id", `${id}`);

  const pro_Container = document.querySelector(".projectsListContainer");
  pro_Container.appendChild(element);
}

function addTask_UI(task) {
  const upperDiv = document.createElement("div");
  upperDiv.classList = "taskContainer";
  upperDiv.setAttribute("id", `${task.id}`);

  const taskListContaine = document.querySelector(".tasksListContainer");
  taskListContaine.appendChild(upperDiv);

  const taskLeftSide = document.createElement("div");
  taskLeftSide.classList = "task-left-side";

  const taskRightSide = document.createElement("div");
  taskRightSide.classList = "task-right-side";

  upperDiv.append(taskLeftSide, taskRightSide);

  const checkBoxWrapper = document.createElement("div");
  checkBoxWrapper.classList = "checkbox-wrapper";

  const checkBoxInput = document.createElement("input");
  checkBoxInput.setAttribute("type", "checkbox");
  if (task.isCompleted) {
    checkBoxInput.checked = true;
  } else {
    checkBoxInput.checked = false;
  }

  checkBoxWrapper.appendChild(checkBoxInput);

  const taskN_D = document.createElement("div");
  taskN_D.classList = "taskNameDescriptionContainer";

  const taskHeader = document.createElement("p");
  taskHeader.classList = "taskHeader";
  taskHeader.textContent = task.title;

  const taskDescription = document.createElement("p");
  taskDescription.classList = "taskDiscription";
  taskDescription.textContent = task.description;

  taskN_D.append(taskHeader, taskDescription);
  taskLeftSide.append(checkBoxWrapper, taskN_D);

  const taskDate = document.createElement("p");
  taskDate.classList = "taskDate";
  const dueDate = format(task.dueDate, "eee-d-MMM-yyyy");
  taskDate.textContent = dueDate;

  const taskEdit = document.createElement("p");
  taskEdit.classList = "taskEdit";

  const taskDelete = document.createElement("p");
  taskDelete.classList = "taskWannaDelete";

  const taskImp = document.createElement("p");
  if (task.isImportant) {
    taskImp.classList = "yesImportantTask";
  } else {
    taskImp.classList = "isTaskImportant";
  }

  taskRightSide.append(taskDate, taskEdit, taskDelete, taskImp);
}

function UpdateImportance(isImportant) {
  console.log(isImportant + " line 78");
  console.log("also enter here line80");
  const taskImp = document.createElement("p");
  if (isImportant) {
    taskImp.classList = "yesImportantTask";
    taskImp.setAttribute("id", "activeToToggle");
  } else {
    taskImp.classList = "isTaskImportant";
    taskImp.setAttribute("id", "activeToToggle");
  }

  const element = document.querySelector("#activeToToggle");
  const taskRightSide = element.parentElement;
  taskRightSide.removeChild(taskRightSide.lastElementChild);
  console.log(taskRightSide);

  taskRightSide.appendChild(taskImp);

  // addActiveClsToTaskForEdit();
}

export { addProject_UI, addTask_UI, UpdateImportance };
