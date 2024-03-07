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

// toggle the importance of a task
function toggleToUnImportant() {
  const toggletoUnImportant = document.querySelectorAll(".yesImportantTask");
  toggletoUnImportant.forEach((importanceBtn) => {
    importanceBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      removePreviouslyActiveID();

      importanceBtn.setAttribute("id", "activeToToggle");
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
      toggleImpotance();
    });
  });
}

// remove Previously Active IDs
function removePreviouslyActiveID() {
  const removeToggleClass = document.querySelector("#activeToToggle");
  if (removeToggleClass) {
    removeToggleClass.removeAttribute("id");
  }
}

function toggleImpotance() {
  const task = document.querySelector("#activeToToggle");
  const taskID = task.parentElement.parentElement.id;

  if (task.className === "yesImportantTask") {
    const UnImportant = { isImportant: false };

    // update at storage
    addEditedTaskAtStorage(taskID, UnImportant);

    // update on UI
    task.classList.remove("yesImportantTask");
    task.classList.add("isTaskImportant");
  } else if (task.className === "isTaskImportant") {
    const Important = { isImportant: true };

    // update at Storage
    addEditedTaskAtStorage(taskID, Important);

    // Update on UI
    task.classList.remove("isTaskImportant");
    task.classList.add("yesImportantTask");
  }
}

function deleteTask() {
  const deleteTask = document.querySelectorAll(".taskWannaDelete");
  deleteTask.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // remove previously added class for deleteTask
      deleteTask.forEach((deleteCls) => {
        deleteCls.parentElement.parentElement.classList.remove("yesDeleteIt");
      });

      // adding a class to adentify whick class we want to delete
      btn.parentElement.parentElement.classList.add("yesDeleteIt");

      const taskContainer = document.querySelector(".yesDeleteIt");
      if (taskContainer.id) {
        // pass this function reference at backend.js module where we delete this task from storage and update it
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
  const isComplete = document.querySelector("#isCompleteActive").checked;
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
