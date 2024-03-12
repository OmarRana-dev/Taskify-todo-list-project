import {
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { addActiveClsToSelectedProject } from "./backend";
import { addProjectToUI, addTaskToUI } from "./UI";
import { getToLoclStorage } from "./localStorage";
import { addActiveClsToTaskForEdit } from "./taskEditor";

function showAllTask() {
  homeORProjectFeaturesFunctionHolder.tasksHeaderUpdater("All");

  const projectList = document.querySelector(".projectsListContainer");
  projectList.textContent = "";

  let tasks = 0;
  const storage = getToLoclStorage();
  storage.forEach((project) => {
    addProjectToUI(project.projectName, project.id);
    project.todos.forEach((task) => {
      addTaskToUI(task);
      tasks++;
    });
  });

  homeORProjectFeaturesFunctionHolder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
  addActiveClsToSelectedProject();
}

function showTodaysTask() {
  homeORProjectFeaturesFunctionHolder.tasksHeaderUpdater("Today's");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      const dueDate = new Date(task.dueDate);

      if (homeORProjectFeaturesFunctionHolder.isToday(dueDate)) {
        addTaskToUI(task);
        tasks++;
      } else {
        // console.log("Does not match.");
        // return;
      }
    });
  });

  homeORProjectFeaturesFunctionHolder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showThisMonthsTask() {
  homeORProjectFeaturesFunctionHolder.tasksHeaderUpdater("This Month");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      const date = new Date(task.dueDate);

      if (homeORProjectFeaturesFunctionHolder.isInCurrentMonth(date)) {
        addTaskToUI(task);
        tasks++;
      } else {
        // console.log("Does not match.");
        // return;
      }
    });
  });

  homeORProjectFeaturesFunctionHolder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showThisWeeksTask() {
  homeORProjectFeaturesFunctionHolder.tasksHeaderUpdater("This Week");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      const date = new Date(task.dueDate);

      if (homeORProjectFeaturesFunctionHolder.isInCurrentWeek(date)) {
        addTaskToUI(task);
        tasks++;
      } else {
        // console.log("Does not match.");
        // return;
      }
    });
  });

  homeORProjectFeaturesFunctionHolder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showImpotantTask() {
  homeORProjectFeaturesFunctionHolder.tasksHeaderUpdater("Important");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      if (task.isImportant) {
        addTaskToUI(task);
        tasks++;
      } else {
        // console.log("Does not match.");
        // return;
      }
    });
  });

  homeORProjectFeaturesFunctionHolder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

function showCompletedTask() {
  homeORProjectFeaturesFunctionHolder.tasksHeaderUpdater("Completed");

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    project.todos.forEach((task) => {
      if (task.isCompleted) {
        addTaskToUI(task);
        tasks++;
      } else {
        // console.log("Does not match.");
        // return;
      }
    });
  });

  homeORProjectFeaturesFunctionHolder.tasksCounter(tasks);
  addActiveClsToTaskForEdit();
}

// after selecting project btn it will show his task only
function showProjectTaskList(name) {
  homeORProjectFeaturesFunctionHolder.tasksHeaderUpdater(name);

  let tasks = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    if (project.projectName === name) {
      project.todos.forEach((task) => {
        addTaskToUI(task);
        tasks++;
      });
    }
  });

  homeORProjectFeaturesFunctionHolder.tasksCounter(tasks);
}

const homeORProjectFeaturesFunctionHolder = {
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
  showProjectTaskList,
};
