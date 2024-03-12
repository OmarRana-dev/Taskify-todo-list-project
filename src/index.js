import './style.css';
import { openDialogForProject, openDialogForTask } from './modules/form';
import { ensureLocalStorage } from './modules/backend';
import {
  showAllTask,
  showThisWeeksTask,
  showThisMonthsTask,
  showTodaysTask,
  showImpotantTask,
  showCompletedTask,
} from './modules/homeFeaturesFun';

// from backend to ensure that browser have taken already data or not
ensureLocalStorage();
showAllTask();

// All Specific btns who are apper in home menu
const allTask = document.querySelector('#allTasks');
allTask.addEventListener('click', showAllTask);

const todaysTasks = document.querySelector('#todayTasks');
todaysTasks.addEventListener('click', showTodaysTask);

const thisMonth = document.querySelector('#monthlyTasks');
thisMonth.addEventListener('click', showThisMonthsTask);

const thisWeek = document.querySelector('#WeeklyTasks');
thisWeek.addEventListener('click', showThisWeeksTask);

const ImportantTask = document.querySelector('#importantTasks');
ImportantTask.addEventListener('click', showImpotantTask);

const completedTask = document.querySelector('#completedTasks');
completedTask.addEventListener('click', showCompletedTask);

// this btns for open form
const openDialogBtnForProject = document.querySelector('#projectAddBtn');
openDialogBtnForProject.addEventListener('click', openDialogForProject);

const openDialogBtnForTask = document.querySelector('#taskAddBtn');
openDialogBtnForTask.addEventListener('click', openDialogForTask);
