import "./style.css";
import { openDialog_p, openDialog_t } from "./modules/form.js";
import { ensureLocalStorage } from "./modules/backend.js";
import {
  showAllTask,
  showThisWeeksTask,
  showThisMonthsTask,
  showTodaysTask,
  showImpotantTask,
  showCompletedTask,
} from "./modules/homeFeaturesFun.js";

// from backend to ensure that browser have taken already data or not
ensureLocalStorage();
showAllTask();

// All Specific btns who are apper in home menu
const allTask = document.querySelector("#allTasks");
allTask.addEventListener("click", showAllTask);

const todaysTasks = document.querySelector("#todayTasks");
todaysTasks.addEventListener("click", showTodaysTask);

const thisMonth = document.querySelector("#monthlyTasks");
thisMonth.addEventListener("click", showThisMonthsTask);

const thisWeek = document.querySelector("#WeeklyTasks");
thisWeek.addEventListener("click", showThisWeeksTask);

const ImportantTask = document.querySelector("#importantTasks");
ImportantTask.addEventListener("click", showImpotantTask);

const completedTask = document.querySelector("#completedTasks");
completedTask.addEventListener("click", showCompletedTask);

// this btns for open form
const openDialogBtn_p = document.querySelector("#projectAddBtn");
openDialogBtn_p.addEventListener("click", openDialog_p);

const openDialogBtn_t = document.querySelector("#taskAddBtn");
openDialogBtn_t.addEventListener("click", openDialog_t);
