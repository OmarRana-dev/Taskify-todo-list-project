class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskName) {
    this.tasks = this.tasks.filter((task) => {
      return task.name !== taskName;
    });
  }


  getTasksByMonth(curentMonth) {
  }

  getCompletedTasks() {

  }

  getWeeklyTasks() {}
}


export { Project };
