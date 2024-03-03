function creatTask(
  title,
  description,
  dueDate,
  isImportant,
  isCompleted = false
) {
  return {
    title,
    description,
    dueDate,
    isImportant,
    isCompleted,
  };
}

class Task {
  constructor(name, description, dueDate, priority, isComplete = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
  }

  taskComplete() {
    this.isComplete = true;
  }

  editTask(name, newDescription, newDueDate, newPriority) {
    this.name = name;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
  }
}

export { Task, creatTask };
