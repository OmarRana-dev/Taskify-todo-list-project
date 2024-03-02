function addProject_UI(project) {
  const element = document.createElement("li");
  element.textContent = `${project}`;
  element.classList = "pro_Btn";

  const pro_Container = document.querySelector(".projectsListContainer");
  pro_Container.appendChild(element);
}

function addTask_UI(task) {
  console.log("hello Task is runing");
  console.log(task);
  const upperDiv = document.createElement("div");
  upperDiv.classList = "taskContainer";

  const taskListContaine = document.querySelector(".tasksListContainer");
  taskListContaine.appendChild(upperDiv);

  const taskLeftSide = document.createElement("div");
  taskLeftSide.classList = "task-left-side";

  const taskRightSide = document.createElement("div");
  taskRightSide.classList = "task-right-side";

  upperDiv.append(taskLeftSide, taskRightSide);

  const checkBoxWrapper = document.createElement("div");
  checkBoxWrapper.classList = "checkbox-wrapper";

  const checkBoxInput = document.createElement("input");
  checkBoxInput.setAttribute("type", "checkbox");

  checkBoxWrapper.appendChild(checkBoxInput);

  const taskN_D = document.createElement("div");
  taskN_D.classList = "taskNameDescriptionContainer";

  const taskHeader = document.createElement("p");
  taskHeader.classList = "taskHeader";
  taskHeader.textContent = task.name;

  const taskDescription = document.createElement("p");
  taskDescription.classList = "taskDiscription";
  taskDescription.textContent = task.description;

  taskN_D.append(taskHeader, taskDescription);
  taskLeftSide.append(checkBoxWrapper, taskN_D);

  const taskDate = document.createElement("p");
  taskDate.classList = "taskDate";
  taskDate.textContent = task.dueDate;

  const taskEdit = document.createElement("p");
  taskEdit.classList = "taskEdit";

  const taskDelete = document.createElement("p");
  taskDelete.classList = "taskWannaDelete";

  const taskImp = document.createElement("p");
  if (task.priority) {
    taskImp.classList = "yesImportantTask";
  } else {
    taskImp.classList = "isTaskImportant";
  }

  taskRightSide.append(taskDate, taskEdit, taskDelete, taskImp);

  console.log("hello Task is runing by the end. ");
}

export { addProject_UI, addTask_UI };
