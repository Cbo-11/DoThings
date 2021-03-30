import Project from "./project";
import ProjectList from "./projectsControl";
import Task from "./task";
import Storage from "./storage";

let project;
const taskTable = document.querySelector("#taskTable");
const projectTitle = document.querySelector("#currentProject");
const taskList = document.getElementById("taskList");
const projects = document.querySelectorAll(".project");
const todayBtn = document.querySelector(".today");
const thisWeekBtn = document.querySelector(".this-week");
const newProject = document.querySelector(".newProject");
const projectFormSelect = document.querySelectorAll(".projectSelect");
const btnAddTask = document.querySelector("#addTaskBtn");
const taskForm = document.getElementById("taskForm");
const btnCloseEdit = document.getElementById("btnCloseEdit");
const updateTask = document.querySelector("#updateTask");

// Set Selected Project
const setProject = (projectName) => {
  const title = document.getElementById("currentProject");
  title.innerHTML = projectName;
  project = projectName;
};

// add a new project
const addProject = () => {
  const projectName = prompt("Please Name This Project");
  if (
    projectName !== "" &&
    Storage.getToDo().getProject(projectName) === undefined
  ) {
    const p = new Project(projectName);
    Storage.addProject(p);
    renderProjects();
  } else {
    alert("Project Already Exists");
  }
};

let renderProjects = () => {
  const projectList = document.getElementById("projectList");
  projectList.innerHTML = "";
  Storage.getToDo().projects.forEach((project) => {
    if (project.title !== "Today" && project.title !== "This Week") {
      const projectLi = document.createElement("li");
      const projectPill = document.createElement("span");
      const detailDiv = document.createElement("div");
      const projectDel = document.createElement("i");
      projectDel.innerHTML = '<i class="bi bi-trash"></i>';
      projectPill.classList.add("badge", "bg-primary", "rounded-pill");
      projectPill.innerHTML = project.tasks.length;
      projectLi.classList.add(
        "project",
        "list-group-item",
        "list-group-item-action",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      projectLi.href = "#";
      projectLi.innerHTML = project.title;
      projectLi.value = project.title;
      detailDiv.appendChild(projectDel);
      detailDiv.appendChild(projectPill);
      projectLi.appendChild(detailDiv);
      projectList.appendChild(projectLi);
      projectDel.addEventListener("click", () => {
        clearTable();
        Storage.deleteProject(project.title);
        renderProjects();
      });
      projectLi.addEventListener("click", () => {
        setProject(project.title);
        populateTable(project);
      });
    }
  });
};

// populate table with project tasks rows
let populateTable = (i) => {
  clearTable();
  i.tasks.forEach((task) => {
    const row = document.createElement("tr");
    const rowTh = document.createElement("td");
    const rowDel = document.createElement("td");
    rowTh.setAttribute("scope", "row");
    rowDel.innerHTML = '<i class="bi bi-trash"></i>';
    rowTh.innerHTML = '<i class="bi bi-pencil-square"></i>';
    row.appendChild(rowTh);

    for (const prop in task) {
      if (!task.hasOwnProperty(prop)) continue;
      if (prop === "complete") {
        const cell = document.createElement("div");
        const check = document.createElement("input");
        check.classList.add("form-check-input");
        check.setAttribute("type", "checkbox");
        check.value = task[prop];
        check.addEventListener("change", () => {
          Storage.completeTask(project, task.title);
        });
        cell.appendChild(check);
        row.appendChild(cell);
      } else {
        const cell = document.createElement("td");
        cell.innerText = task[prop];
        row.appendChild(cell);
      }
    }

    rowTh.addEventListener("click", () => {
      editModal(task);
    });
    rowDel.addEventListener("click", () => {
      Storage.deleteTask(i.title, task);
      renderProjects();
      populateTable(Storage.getToDo().getProject(project));
    });
    row.appendChild(rowDel);
    taskList.appendChild(row);
  });
};

let clearTable = () => {
  taskList.innerHTML = "";
};

const closeModal = () => {
  document.getElementById("modalBlank").style.display = "none";
};

let editModal = (task) => {
  const modalBlank = document.getElementById("modalBlank");
  if (modalBlank.style.display === "none") {
    modalBlank.style.display = "block";
    populateModal(task);
  } else {
    modalBlank.style.display = "none";
  }
};

function loadProjects() {
  Storage.getToDo();
  renderProjects();
}

let populateModal = (t) => {
  const editName = document.getElementById("editName");
  const editDescription = document.getElementById("editDescription");
  const editDueDate = document.getElementById("editDueDate");
  const editPriority = document.getElementById("editPriority");
  const taskId = document.getElementById("taskId");

  taskId.innerText = t.title;
  editName.setAttribute("value", t.title);
  editDescription.setAttribute("value", t.description);
  editDueDate.setAttribute("value", t.dueDate);
  editPriority.setAttribute("value", t.priority);
};

// update task on submitting modal form
updateTask.onsubmit = function (e) {
  e.preventDefault();
  const taskId = document.getElementById("taskId").innerText;
  const editName = document.getElementById("editName").value;
  const editDescription = document.getElementById("editDescription").value;
  const editDueDate = document.getElementById("editDueDate").value;
  const editPriority = document.getElementById("editPriority").value;
  const editComplete = false;
  const task = new Task(
    editName,
    editDescription,
    editDueDate,
    editPriority,
    editComplete
  );
  Storage.updateTask(project, taskId, task);
  populateTable(Storage.getToDo().getProject(project));
  updateTask.reset();
  closeModal();
};

// submit taskForm to add new task
taskForm.onsubmit = function () {
  const taskNam = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const projDrop = document.querySelector("#projectSelect").selectedOptions[0]
    .value;
  const dueDate = document.getElementById("duedate").value;
  const priority = document.getElementById("priority").value;
  const newTask = new Task(taskNam, description, dueDate, priority);
  const projectSelect = Storage.getToDo().getProject(projDrop);
  Storage.addTask(projectSelect.title, newTask);
  taskForm.reset();
  renderProjects();
  populateTable(Storage.getToDo().getProject(projectSelect.title));
  setProject(projectSelect.title);
};

// event listeners
projects.forEach((projectNav) => {
  projectNav.addEventListener("click", () => {
    setProject(projectNav.innerHTML);
    const proj = Storage.getToDo().getProject(projectNav.getAttribute("value"));
    populateTable(proj);
  });
});

projectFormSelect.forEach((selector) => {
  selector.addEventListener("click", () => {
    this.innerHTML = "";
    const placeholder = document.createElement("OPTION");
    placeholder.value = "";
    placeholder.innerHTML = "Choose Project";
    placeholder.disabled = true;
    this.appendChild(placeholder);
    Storage.getToDo().projects.forEach((project) => {
      if (project.title !== "Today" && project.title !== "This Week") {
        const optionSelector = document.createElement("OPTION");
        optionSelector.innerHTML = project.title;
        optionSelector.value = project.title;
        this.appendChild(optionSelector);
      }
    });
  });
});

newProject.addEventListener("click", addProject);
btnCloseEdit.addEventListener("click", closeModal);
document.addEventListener("load", loadProjects());
todayBtn.addEventListener("click", () => {
  Storage.updateToday();
  const p = Storage.getToDo().getProject("Today");
  populateTable(p);
  setProject(p.title);
});
thisWeekBtn.addEventListener("click", () => {
  Storage.updateWeek();
  const p = Storage.getToDo().getProject("This Week");
  populateTable(p);
  setProject(p.title);
});
