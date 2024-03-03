import "./style.css";
import { Task } from "./modules/task.js";
import { Project } from "./modules/project.js";
import { addProject_UI, addTask_UI } from "./modules/UI.js";
import { openDialog_p, openDialog_t } from "./modules/form.js";
import { showAddTaskBtn, UpdateUI, addGetActive } from "./modules/backend.js";

UpdateUI();
addGetActive();

const openDialogBtn_p = document.querySelector("#projectAddBtn");
openDialogBtn_p.addEventListener("click", openDialog_p);

const openDialogBtn_t = document.querySelector("#taskAddBtn");
openDialogBtn_t.addEventListener("click", openDialog_t);
