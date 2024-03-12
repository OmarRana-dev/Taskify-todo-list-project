import { getToLoclStorage } from "./localStorage";

function creatTask(
  projectID,
  title,
  description,
  dueDate,
  isImportant,
  isCompleted = false,
) {
  return {
    id: generateID(projectID),
    title,
    description,
    dueDate,
    isImportant,
    isCompleted,
  };
}

function editTask(title, description, dueDate) {
  return {
    title,
    description,
    dueDate,
  };
}

function generateID(id) {
  let taskID = 0;

  const dataHolder = getToLoclStorage();
  dataHolder.forEach((project) => {
    if (project.id === id) {
      project.todos.forEach(() => {
        taskID++;
      });
    }
  });
  taskID++;
  const generatedID = `${id}T${taskID}`;
  return generatedID;
}

export { creatTask, editTask };
