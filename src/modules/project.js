import { getToLoclStorage } from "./localStorage";

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
  dataHolder.forEach(() => {
    id++;
  });
  id += 1;
  const generatedID = `P${id}`;
  return generatedID;
}

export { createProject };
