import { updateTask } from "./form.js";
import { getTaskWithIDforEdit, addEditedTaskAtStorage } from "./backend.js";
import { UpdateImportance } from "./UI.js";

function addActiveClsToTaskForEdit() {
  console.log("from editor");

  EditTask();
  toggleToUnImportant();
  toggleToImportant();
}

function EditTask() {
  const taskListEditTag = document.querySelectorAll(".taskEdit");
  taskListEditTag.forEach((editTag) => {
    editTag.addEventListener("click", () => {
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
  //   console.log(toggletoUnImportant);
  toggletoUnImportant.forEach((importanceBtn) => {
    importanceBtn.addEventListener("click", () => {
      removePreviouslyActiveID();
      importanceBtn.setAttribute("id", "activeToToggle");
      console.log(importanceBtn);
      toggleImpotance();
    });
  });
}

function toggleToImportant() {
  const toggleToImportant = document.querySelectorAll(".isTaskImportant");
  //   console.log(toggleToImportant);
  toggleToImportant.forEach((importanceBtn) => {
    importanceBtn.addEventListener("click", () => {
      removePreviouslyActiveID();
      importanceBtn.setAttribute("id", "activeToToggle");
      console.log(importanceBtn);
      toggleImpotance();
    });
  });
}

function removePreviouslyActiveID() {
  //   const removeToggleClass = document.querySelector("#activeToToggle");
  //   if (removeToggleClass) {
  //     removeToggleClass.removeAttribute("id");
  //   }
  const toggletoUnImportant = document.querySelectorAll(".yesImportantTask");
  toggletoUnImportant.forEach((importanceBtn) => {
    importanceBtn.removeAttribute("id");
  });

  const toggleToImportant = document.querySelectorAll(".isTaskImportant");
  toggleToImportant.forEach((importanceBtn) => {
    importanceBtn.removeAttribute("id");
  });
}

function toggleImpotance() {
  //   console.log("HI in editor");
  const task = document.querySelector("#activeToToggle");
  console.log(task);
  const taskID = task.parentElement.parentElement.id;
  console.log(taskID + "line 63");
  if (task.className === "yesImportantTask") {
    const UnImportant = { isImportant: false };
    addEditedTaskAtStorage(taskID, UnImportant);
    console.log("Im in Important");
  } else if (task.className === "isTaskImportant") {
    const Important = { isImportant: true };
    addEditedTaskAtStorage(taskID, Important);
    console.log("Im in UnImportant");
  }
  addChangedValueAtUI(taskID, task);
}

function addChangedValueAtUI(taskID, element) {
  console.log("enter line 77");
  const taskAtStorage = getTaskWithIDforEdit(taskID);
//   UpdateImpotance(taskAtStorage.isImportant, element);
}

export { addActiveClsToTaskForEdit, };
