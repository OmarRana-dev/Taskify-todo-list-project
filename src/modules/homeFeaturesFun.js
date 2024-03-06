import { UpdateUI, addActiveClsToSelectedProject } from "./backend.js";
import { addProject_UI, addTask_UI } from "./UI.js";
import {
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { getToLoclStorage } from "./localStorage.js";
import { addActiveClsToTaskForEdit } from "./taskEditor.js";

function showAllTask() {
  home_OR_Project_Features_Function_Holder.tasksHeaderUpdater("All");

  const projectList = document.querySelector(".projectsListContainer");
  projectList.textContent = "";

  let tasks = 0;
  const storage = getToLoclStorage();
  storage.forEach((project) => {
    addProject_UI(project.projectName, project.id);
    project.todos.forEach((task) => {
      addTask_UI(task);
      tasks++;
    });
  });

  home_OR_Project_Features_Function_Holder.tasksCounter(tasks);
  addActiveClsToSelectedProject();
}

function showTodaysTask() {
  home_OR_Project_Features_Function_Holder.tasksHeaderUpdater("Today's");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      const dueDate = new Date(task.dueDate);

      if (home_OR_Project_Features_Function_Holder.isToday(dueDate)) {
        addTask_UI(task);
        tasks++;
      } else {
        console.log("Does not match.");
        return;
      }
    });
  });

  home_OR_Project_Features_Function_Holder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showThisMonthsTask() {
  home_OR_Project_Features_Function_Holder.tasksHeaderUpdater("This Month");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      const date = new Date(task.dueDate);

      if (home_OR_Project_Features_Function_Holder.isInCurrentMonth(date)) {
        addTask_UI(task);
        tasks++;
      } else {
        console.log("Does not match.");
        return;
      }
    });
  });

  home_OR_Project_Features_Function_Holder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showThisWeeksTask() {
  home_OR_Project_Features_Function_Holder.tasksHeaderUpdater("This Week");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      const date = new Date(task.dueDate);

      if (home_OR_Project_Features_Function_Holder.isInCurrentWeek(date)) {
        addTask_UI(task);
        tasks++;
      } else {
        console.log("Does not match.");
        return;
      }
    });
  });

  home_OR_Project_Features_Function_Holder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showImpotantTask() {
  home_OR_Project_Features_Function_Holder.tasksHeaderUpdater("Important");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      if (task.isImportant) {
        addTask_UI(task);
        tasks++;
      } else {
        console.log("Does not match.");
        return;
      }
    });
  });

  home_OR_Project_Features_Function_Holder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showCompletedTask() {
  home_OR_Project_Features_Function_Holder.tasksHeaderUpdater("Completed");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      if (task.isCompleted) {
        addTask_UI(task);
        tasks++;
      } else {
        console.log("Does not match.");
        return;
      }
    });
  });

  home_OR_Project_Features_Function_Holder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

// after selecting project btn it will show his task only
function getProjectTaskList(name) {
  home_OR_Project_Features_Function_Holder.tasksHeaderUpdater(name);

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    if (project.projectName === name) {
      project.todos.forEach((task) => {
        addTask_UI(task);
        tasks++;
      });
    }
  });

  home_OR_Project_Features_Function_Holder.tasksCounter(tasks);
  // addActiveClsToTaskForEdit();
}

const home_OR_Project_Features_Function_Holder = {
  isInCurrentMonth(date) {
    const currentMonth = new Date();
    return isSameMonth(date, currentMonth);
  },

  isInCurrentWeek(date) {
    const currentWeekStart = startOfWeek(new Date());
    const currentWeekEnd = endOfWeek(new Date());
    return (
      isSameWeek(date, currentWeekStart) || isSameWeek(date, currentWeekEnd)
    );
  },

  isToday(date) {
    const today = new Date();
    return isSameDay(date, today);
  },

  tasksHeaderUpdater(value) {
    const previousTask = document.querySelector(".tasksListContainer");
    previousTask.innerHTML = "";

    const taskHeader = document.querySelector(".tasksHeader");
    taskHeader.textContent = `${value} Tasks`;

    const taskBtnContainer = document.querySelector("#taskBtnContainer");
    taskBtnContainer.setAttribute("style", "display: none;");
  },

  tasksCounter(tasks) {
    const taskCount = document.querySelector("#taskCount");
    taskCount.textContent = `${tasks}`;
  },

  hideAddTaskBtn() {},
};

export {
  showAllTask,
  showThisMonthsTask,
  showThisWeeksTask,
  showTodaysTask,
  showImpotantTask,
  showCompletedTask,
  getProjectTaskList,
};
