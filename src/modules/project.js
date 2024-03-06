import { getToLoclStorage } from "./localStorage.js";

function createProject(projectName) {
  return {
    id: generateID(),
    projectName,
    todos: [],
  };
}

function generateID() {
  let id = 0;
  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    id++;
  });
  id += 1;
  let generatedID = `P${id}`;
  return generatedID;
}

export { createProject };