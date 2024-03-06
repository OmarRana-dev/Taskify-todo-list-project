// import { defaultProjects } from "../index.js";
import { addTask_UI, addProject_UI } from "./UI.js";
import { getProjectTaskList } from "./homeFeaturesFun.js";
import { addToLocalStorage, getToLoclStorage } from "./localStorage.js";
import { addActiveClsToTaskForEdit } from "./taskEditor.js";

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

function ensureLocalStorage() {
  if (getToLoclStorage() === null) {
    console.log("add to storage");
    addToLocalStorage(defaultProjects);
  }
}

function showAddTaskBtn() {
  const taskBtnContainer = document.querySelector("#taskBtnContainer");
  taskBtnContainer.setAttribute("style", "display: block;");
}

function addActiveClsToSelectedProject() {
  const projectList = document.querySelectorAll("ul.projectsListContainer>li");
  projectList.forEach((project) => {
    project.addEventListener("click", () => {
      const projectName = project.textContent;
      getProjectTaskList(projectName);

      // Remove the "activeProject" class from any previously active project
      projectList.forEach((otherProject) => {
        otherProject.classList.remove("activeProject");
      });

      console.log("done from selected project");
      // Add the "activeProject" class to the current clicked project
      project.classList.add("activeProject");

      showAddTaskBtn();
      addActiveClsToTaskForEdit();
    });
  });
  addActiveClsToTaskForEdit();
}

function addActiveClsToNewlyAddedProject(id) {
  addActive(id);
  console.log("from auto Add");
  const activeProject = document.querySelector(".activeProject");
  const projectName = activeProject.innerHTML;
  getProjectTaskList(projectName);

  showAddTaskBtn();
  addActiveClsToSelectedProject();
  // addActiveClsToTaskForEdit();
}

function addActive(id) {
  const projectList = document.querySelectorAll("ul.projectsListContainer>li");
  const activeProject = Array.from(projectList).find((li) => li.id === `${id}`);

  activeProject.classList.add("activeProject");
}

function appendTaskToParent(id, title, task) {
  const dataHolder = getToLoclStorage();
  console.log("enter");
  // console.log(defaultProjects);
  console.log(dataHolder);
  const matchingProject = dataHolder.find(
    (project) => project.id === id || project.projectName === title
  );

  if (matchingProject) {
    matchingProject.todos.push(task);
    console.log("Task added to project:", matchingProject.projectName); // Log success
  } else {
    console.error("Project with ID", id, "or title", title, "not found.");
  }
  addToLocalStorage(dataHolder);
  console.log(getToLoclStorage());

  console.log("Out");
}

function addEditedTaskAtStorage(taskId, updatedValues) {
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

function UpdateUI() {
  const projectList = document.querySelector(".projectsListContainer");
  projectList.textContent = "";

  const taskLists = document.querySelector(".tasksListContainer");
  taskLists.textContent = "";

  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    //   console.log(project);
    addProject_UI(project.projectName, project.id);
    project.todos.forEach((task) => {
      // console.log(task);
      addTask_UI(task);
    });
  });
  addActiveClsToSelectedProject();
  addActiveClsToTaskForEdit();
}

export {
  ensureLocalStorage,
  showAddTaskBtn,
  defaultProjects,
  UpdateUI,
  addActiveClsToSelectedProject,
  appendTaskToParent,
  addActiveClsToNewlyAddedProject,
  addEditedTaskAtStorage,
  getTaskWithIDforEdit,
};
