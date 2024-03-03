import { defaultProjects } from "./backend.js";

function createProject(projectName) {
  return {
    id: generateID(),
    projectName,
    todos: [],
  };
}
class Project {
  constructor(name) {
    this.id = 7;
    this.name = name;
    this.todos = [];

    return this;
  }

  addTask(task) {
    this.todos.push(task);
  }
}

// class Project {
//   constructor(name) {
//     this.id = generateID();
//     this.name = name;
//     this.todos = [];

//     return this;
//   }

//   removeTask(taskName) {
//     this.todos = this.todos.filter((task) => {
//       return task.name !== taskName;
//     });
//   }

//   getTasksByMonth(curentMonth) {}

//   getCompletedTasks() {}

//   getWeeklyTasks() {}
// }

function generateID() {
  let id = 0;
  defaultProjects.forEach((project) => {
    id = project.id;
  });
  id += 1;
  return id;
}

export { Project, createProject };
