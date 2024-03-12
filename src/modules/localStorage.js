import { defaultProjects } from "./backend";

const addToLocalStorage = (value) => {
  localStorage.setItem("projectsAndTasks", JSON.stringify(value));
};

const getToLoclStorage = () => {
  const fromLocalStorage = JSON.parse(localStorage.getItem("projectsAndTasks"));
  return fromLocalStorage;
};

export { addToLocalStorage, getToLoclStorage };
