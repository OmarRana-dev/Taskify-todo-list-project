import { updateTask } from "./form.js";
import {
  deleteTaskFromStorage,
  addEditedTaskAtStorage,
  deleteProjectFromStorage,
} from "./backend.js";

function addActiveClsToTaskForEdit() {
  console.log("from editor");

  EditTask();
  toggleToUnImportant();
  toggleToImportant();
  deleteTask();
  deleteProject();
  isTaskComplete();
}

function EditTask() {
  const taskListEditTag = document.querySelectorAll(".taskEdit");
  taskListEditTag.forEach((editTag) => {
    editTag.addEventListener("click", (e) => {
      e.stopPropagation();
      taskListEditTag.forEach((editbtn) => {
        editbtn.parentElement.parentElement.classList.remove("activeTask");
      });

      editTag.parentElement.parentElement.classList.add("activeTask");
      updateTask();
    });
  });
}

function toggleToUnImportant() {
  const toggletoUnImportant = document.querySelectorAll(".yesImportantTask");
  toggletoUnImportant.forEach((importanceBtn) => {
    importanceBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removePreviouslyActiveID();
      importanceBtn.setAttribute("id", "activeToToggle");
      console.log(importanceBtn);
      toggleImpotance();
    });
  });
}

function toggleToImportant() {
  const toggleToImportant = document.querySelectorAll(".isTaskImportant");
  toggleToImportant.forEach((importanceBtn) => {
    importanceBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removePreviouslyActiveID();
      importanceBtn.setAttribute("id", "activeToToggle");
      console.log(importanceBtn);
      toggleImpotance();
    });
  });
}

function removePreviouslyActiveID() {
  const removeToggleClass = document.querySelector("#activeToToggle");
  if (removeToggleClass) {
    removeToggleClass.removeAttribute("id");
  }
}

function toggleImpotance() {
  const task = document.querySelector("#activeToToggle");
  const taskID = task.parentElement.parentElement.id;
  console.log(taskID + "line 61");
  if (task.className === "yesImportantTask") {
    const UnImportant = { isImportant: false };
    addEditedTaskAtStorage(taskID, UnImportant);

    task.classList.remove("yesImportantTask");
    task.classList.add("isTaskImportant");
  } else if (task.className === "isTaskImportant") {
    const Important = { isImportant: true };
    addEditedTaskAtStorage(taskID, Important);

    task.classList.remove("isTaskImportant");
    task.classList.add("yesImportantTask");
  }

  console.log(task.className);
}

function deleteTask() {
  const deleteTask = document.querySelectorAll(".taskWannaDelete");
  deleteTask.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask.forEach((deleteCls) => {
        deleteCls.parentElement.parentElement.classList.remove("yesDeleteIt");
      });

      btn.parentElement.parentElement.classList.add("yesDeleteIt");

      const taskContainer = document.querySelector(".yesDeleteIt");
      console.log(taskContainer);
      console.log(taskContainer.id);
      if (taskContainer.id) {
        deleteTaskFromStorage(taskContainer.id);
      }
    });
  });
}

function isTaskComplete() {
  const isComplete = document.querySelectorAll(".isComplete");
  isComplete.forEach((input) => {
    input.addEventListener("click", (e) => {
      e.stopPropagation();
      isComplete.forEach((input) => {
        input.removeAttribute("id", "isCompleteActive");
      });

      input.setAttribute("id", "isCompleteActive");
      toggleCompletedTaskAndAddToStorage();
    });
  });
}

function toggleCompletedTaskAndAddToStorage() {
  const taskID =
    document.querySelector("#isCompleteActive").parentElement.parentElement
      .parentElement.id;
  console.log(taskID);
  const isComplete = document.querySelector("#isCompleteActive").checked;
  console.log(isComplete);
  if (isComplete) {
    const Completed = { isCompleted: true };

    if (taskID) {
      addEditedTaskAtStorage(taskID, Completed);
    }
  } else if (!isComplete) {
    const notComplete = { isCompleted: false };

    if (taskID) {
      addEditedTaskAtStorage(taskID, notComplete);
    }
  }
}

function deleteProject() {
  const deleteProject = document.querySelectorAll(".projectDeleteSpan");
  
  deleteProject.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteProject.forEach((btn) => {
        btn.parentElement.classList.remove("deleteProject");
      });

      btn.parentElement.classList.add("deleteProject");

      const projectContainer = document.querySelector(".deleteProject");
      if (projectContainer.id) {
        deleteProjectFromStorage(projectContainer.id);
      }
    });
  });
}
export { addActiveClsToTaskForEdit, deleteTask };
