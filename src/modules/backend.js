import { showProjectTaskList, showAllTask } from "./homeFeaturesFun";
import { addToLocalStorage, getToLoclStorage } from "./localStorage";
import { addActiveClsToTaskForEdit } from "./taskEditor";

const defaultProjects = [
  {
    id: "P0",
    projectName: "Programming Fundamentals",
    todos: [
      {
        id: "P0T1",
        title: "Learn a new JavaScript framework (e.g., React, Vue)",
        description:
          "Brief description of the task related to learning a new JavaScript framework",
        dueDate: "03-05-2024",
        isCompleted: true,
        isImportant: true,
      },
      {
        id: "P0T2",
        title: "Practice solving coding challenges online",
        description:
          "Brief description of the task related to practicing coding challenges",
        dueDate: "03-07-2024",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    id: "P1",
    projectName: "Web Development Skills",
    todos: [
      {
        id: "P1T1",
        title: "Contribute to an open-source project",
        description:
          "Brief description of the task related to contributing to an open-source project",
        dueDate: "03-05-2024",
        isCompleted: true,
        isImportant: true,
      },
      {
        id: "P1T2",
        title: "Debug a complex bug in your code",
        description:
          "Brief description of the task related to debugging a complex bug",
        dueDate: "03-04-2024",
        isCompleted: false,
        isImportant: false,
      },
    ],
  },
  {
    id: "P2",
    projectName: "Mindfulness and Meditation",
    todos: [
      {
        id: "P2T1",
        title: "Meditate for 10 minutes",
        description: "Brief description of the task related to meditating",
        dueDate: "03-05-2024",
        isCompleted: true,
        isImportant: true,
      },
      {
        id: "P2T2",
        title: "Read a book about mindfulness",
        description:
          "Brief description of the task related to reading about mindfulness",
        dueDate: "04-12-2024",
        isCompleted: false,
        isImportant: false,
      },
    ],
  },
];

// Function that just ensure browser have already taken data or not
function ensureLocalStorage() {
  if (getToLoclStorage() === null) {
    // console.log("add to storage");
    addToLocalStorage(defaultProjects);
  }
}

// when u click on specific project this function just will give you all of the tasks of this function or Project
function addActiveClsToSelectedProject() {
  const projectList = document.querySelectorAll("ul.projectsListContainer>li");
  projectList.forEach((project) => {
    project.addEventListener("click", (e) => {
      e.stopPropagation();

      // show you the specific project tasks on UI
      const projectName = project.textContent;
      showProjectTaskList(projectName);

      // Remove the "activeProject" class from any previously active project
      projectList.forEach((otherProject) => {
        otherProject.classList.remove("activeProject");
      });

      // Add the "activeProject" class to the current clicked project
      project.classList.add("activeProject");

      // show the add task btn after selecting on project
      const taskBtnContainer = document.querySelector("#taskBtnContainer");
      taskBtnContainer.setAttribute("style", "display: block;");

      addActiveClsToTaskForEdit();
    });
  });
}

function showAddTaskBtn() {
  const taskBtnContainer = document.querySelector("#taskBtnContainer");
  taskBtnContainer.setAttribute("style", "display: block;");
}

function appendTaskToParent(id, title, task) {
  const dataHolder = getToLoclStorage();
  // console.log("enter");
  // console.log(dataHolder);
  const matchingProject = dataHolder.find(
    (project) => project.id === id || project.projectName === title,
  );

  if (matchingProject) {
    matchingProject.todos.push(task);
    // console.log("Task added to project:", matchingProject.projectName); // Log success
  } else {
    // console.error("Project with ID", id, "or title", title, "not found.");
  }
  addToLocalStorage(dataHolder);
}

function addEditedTaskAtStorage(taskId, updatedValues) {
  // console.log(taskId);
  // console.log(updatedValues);
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      if (task.id === taskId) {
        Object.assign(task, updatedValues);
      }
    });
  });
  addToLocalStorage(dataHolder);
}

function getTaskWithIDforEdit(taskId) {
  const dataHolder = getToLoclStorage();
  // Use the find method to search through all tasks in all projects
  const foundTask = dataHolder
    .flatMap((project) => project.todos)
    .find((todo) => todo.id === taskId);

  // Return the found task or undefined
  return foundTask;
}

function deleteProjectFromStorage(projectID) {
  // console.log(projectID);
  const dataHolder = getToLoclStorage();

  dataHolder.forEach(() => {
    const projectIndex = dataHolder.findIndex(
      (project) => project.id === projectID,
    );

    // console.log(projectIndex);
    if (projectIndex !== -1) {
      dataHolder.splice(projectIndex, 1);
      // console.log(`Project with ID ${projectID} deleted successfully.`);
      addToLocalStorage(dataHolder);
      // console.log("done on backend 177");
      showAllTask();
      // return;
    }
  });
}

// as this function name shows this will delete the task from storage and update it on UI
function deleteTaskFromStorage(taskID) {
  const dataHolder = getToLoclStorage();

  dataHolder.forEach((project) => {
    const taskIndex = project.todos.findIndex((todo) => todo.id === taskID);

    if (taskIndex !== -1) {
      // console.log(taskIndex);
      project.todos.splice(taskIndex, 1);
      // console.log(`Task with ID ${taskID} deleted successfully.`);
      addToLocalStorage(dataHolder);
      showAllTask();
    }
  });
}

export {
  ensureLocalStorage,
  showAddTaskBtn,
  defaultProjects,
  addActiveClsToSelectedProject,
  appendTaskToParent,
  addEditedTaskAtStorage,
  getTaskWithIDforEdit,
  deleteProjectFromStorage,
  deleteTaskFromStorage,
};
