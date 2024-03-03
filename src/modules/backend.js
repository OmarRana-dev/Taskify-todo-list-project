// import { defaultProjects } from "../index.js";
import { addTask_UI, addProject_UI } from "./UI.js";

function showAddTaskBtn() {
  const taskBtnContainer = document.querySelector("#taskBtnContainer");
  taskBtnContainer.setAttribute("style", "display: block;");
}

function getActiveProject() {
  const projectList = document.querySelectorAll("ul.projectsListContainer>li");
  const activeProject = Array.from(projectList).filter(
    (li) => li.className === "activeProject"
  );

  return activeProject;
}

function addGetActive() {
  const projectList = document.querySelectorAll("ul.projectsListContainer>li");
  projectList.forEach((project) => {
    project.addEventListener("click", () => {
      // Remove the "activeProject" class from any previously active project
      projectList.forEach((otherProject) => {
        otherProject.classList.remove("activeProject");
      });

      // Add the "activeProject" class to the current clicked project
      project.classList.add("activeProject");

      showAddTaskBtn();
    });
  });
}

const defaultProjects = [
  {
    id: 0,
    projectName: "Programming Fundamentals",
    todos: [
      {
        title: "Learn a new JavaScript framework (e.g., React, Vue)",
        description:
          "Brief description of the task related to learning a new JavaScript framework",
        dueDate: "2024-03-05",
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Practice solving coding challenges online",
        description:
          "Brief description of the task related to practicing coding challenges",
        dueDate: "2024-03-07",
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Read a book about algorithms and data structures",
        description:
          "Brief description of the task related to reading about algorithms and data structures",
        dueDate: "2024-03-10",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    id: 1,
    projectName: "Web Development Skills",
    todos: [
      {
        title: "Contribute to an open-source project",
        description:
          "Brief description of the task related to contributing to an open-source project",
        dueDate: "2024-03-12",
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Debug a complex bug in your code",
        description:
          "Brief description of the task related to debugging a complex bug",
        dueDate: "2024-03-14",
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Learn a new front-end framework (e.g., React, Vue)",
        description:
          "Brief description of the task related to learning a new front-end framework",
        dueDate: "2024-03-16",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    id: 2,
    projectName: "Mindfulness and Meditation",
    todos: [
      {
        title: "Meditate for 10 minutes",
        description: "Brief description of the task related to meditating",
        dueDate: "2024-03-05",
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Read a book about mindfulness",
        description:
          "Brief description of the task related to reading about mindfulness",
        dueDate: "2024-03-07",
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Practice deep breathing exercises",
        description:
          "Brief description of the task related to practicing deep breathing exercises",
        dueDate: "2024-03-09",
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    id: 3,
    projectName: "Healthy Habits and Lifestyle",
    todos: [
      {
        title: "Go for a walk or exercise",
        description:
          "Brief description of the task related to going for a walk or exercise",
        dueDate: "2024-03-05",
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Eat a healthy breakfast",
        description:
          "Brief description of the task related to eating a healthy breakfast",
        dueDate: "Daily", // Replace with "Daily" or other recurring schedule
        isCompleted: false,
        isImportant: true,
      },
      {
        title: "Get enough sleep",
        description:
          "Brief description of the task related to getting enough sleep",
        dueDate: "Daily", // Replace with "Daily" or other recurring schedule
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
];

function appendTaskToParent(id, title, task) {
  const matchingProject = defaultProjects.find(
    (project) => project.id === id || project.projectName === title
  );

  if (matchingProject) {
    matchingProject.todos.push(task);
    console.log("Task added to project:", matchingProject.projectName); // Log success
  } else {
    console.error("Project with ID", id, "or title", title, "not found.");
  }
}

function UpdateUI() {
  const projectList = document.querySelector(".projectsListContainer");
  projectList.textContent = "";

  const taskLists = document.querySelector(".tasksListContainer");
  taskLists.textContent = "";

  defaultProjects.forEach((project) => {
    //   console.log(project);
    addProject_UI(project.projectName, project.id);
    project.todos.forEach((task) => {
      // console.log(task);
      addTask_UI(task);
    });
  });
}

export {
  showAddTaskBtn,
  getActiveProject,
  defaultProjects,
  UpdateUI,
  addGetActive,
  appendTaskToParent,
};
