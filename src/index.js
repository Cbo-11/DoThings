import Project from './project.js';
import ProjectList from './projectsControl'
import Task from './task'
import Storage from './storage'

var project;
//dom control 
let taskTable = document.querySelector('#taskTable');
let projectTitle = document.querySelector('#currentProject');
let taskList = document.getElementById('taskList')
const projects = document.querySelectorAll('.project');
const todayBtn = document.querySelector('.today');
const thisWeekBtn = document.querySelector('.this-week');
const newProject = document.querySelector('.newProject');
const projectFormSelect = document.querySelectorAll('.projectSelect');
const btnAddTask = document.querySelector('#addTaskBtn');
var taskForm = document.getElementById('taskForm');
const btnCloseEdit = document.getElementById('btnCloseEdit');
const updateTask = document.querySelector('#updateTask')


function loadProjects(){
    Storage.getToDo();
    renderProjects();
}


//Set Selected Project
var setProject = (projectName) => {
    var title = document.getElementById("currentProject");
    title.innerHTML = projectName;
    project = projectName
};

//add a new project 
var addProject = () =>{
    let projectName = prompt("Please Name This Project");
    if(projectName !=="" && Storage.getToDo().getProject(projectName) == undefined) {
        let p = new Project(projectName);
       Storage.addProject(p)
        renderProjects();
    } else { 
        alert('Project Already Exists')
    }
};

var renderProjects= () => {
    var projectList = document.getElementById('projectList');
    projectList.innerHTML = ''
        Storage.getToDo().projects.forEach((project) => {
        if(project.title !== "Today" && project.title !== "This Week"){
        var projectLi = document.createElement('li');
        var projectPill = document.createElement('span');
        var detailDiv = document.createElement('div');
        var projectDel = document.createElement('i')
        projectDel.innerHTML = "<i class=\"bi bi-trash\"></i>";
        projectPill.classList.add("badge", "bg-primary", "rounded-pill");
        projectPill.innerHTML =  project.tasks.length;
        projectLi.classList.add('project', 'list-group-item','list-group-item-action','d-flex','justify-content-between', 'align-items-center');
        projectLi.href = "#";
        projectLi.innerHTML = project.title;
        projectLi.value = project.title;
        detailDiv.appendChild(projectDel);
        detailDiv.appendChild(projectPill);
        projectLi.appendChild(detailDiv);
        projectList.appendChild(projectLi);
        projectDel.addEventListener("click",()=>{
            clearTable();
            Storage.deleteProject(project.title);
            renderProjects();
        })
        projectLi.addEventListener("click",() => { 
            setProject(project.title);
            populateTable(project);

        });
    } 
    })
}

//populate table with project tasks rows
var populateTable = (i) => {
    clearTable()
    i.tasks.forEach((task) => {
        let row = document.createElement('tr');
        let rowTh = document.createElement('td');
        let rowDel= document.createElement('td');
        rowTh.setAttribute('scope',"row");
        rowDel.innerHTML = "<i class=\"bi bi-trash\"></i>";
        rowTh.innerHTML = "<i class=\"bi bi-pencil-square\"></i>";
        row.appendChild(rowTh);

        for(var prop in task) {
            if(!task.hasOwnProperty(prop)) continue
            if(prop == 'complete') {
                let cell = document.createElement('div');
                let check = document.createElement('input');
                check.classList.add('form-check-input')
                check.setAttribute('type','checkbox')
                check.value= task[prop];
                check.addEventListener('change',() => {Storage.completeTask(project, task.title)})
                cell.appendChild(check);
                row.appendChild(cell);
            } else {
            let cell = document.createElement('td');
            cell.innerText = task[prop];
            row.appendChild(cell);
        };
        };

        rowTh.addEventListener('click', () => {editModal(task)})
        rowDel.addEventListener('click',()=>{
            Storage.deleteTask(i.title,task); 
            renderProjects();
            populateTable(Storage.getToDo().getProject(project));
        });
        row.appendChild(rowDel);
    taskList.appendChild(row);
});
};

var clearTable = () => {
    taskList.innerHTML = "";
}

  var closeModal = () => {
    document.getElementById("modalBlank").style.display = "none";
  }

var editModal = (task) => {
    let modalBlank = document.getElementById("modalBlank")
    if (modalBlank.style.display === "none") {
        modalBlank.style.display = "block";
        populateModal(task);
      } else {
        modalBlank.style.display = "none";
      };
};


var populateModal = (t) => { 
    let editName = document.getElementById('editName');
    let editDescription = document.getElementById('editDescription');
    let editDueDate = document.getElementById('editDueDate');
    let editPriority = document.getElementById('editPriority');
    let taskId = document.getElementById('taskId');

    taskId.innerText=t.title
    editName.setAttribute('value', t.title)
    editDescription.setAttribute('value', t.description)
    editDueDate.setAttribute('value', t.dueDate)
    editPriority.setAttribute('value', t.priority)
}

//update task on submitting modal form
updateTask.onsubmit = function(e) {
    e.preventDefault();
    let taskId = document.getElementById('taskId').innerText;
    let editName = document.getElementById('editName').value;
    let editDescription = document.getElementById('editDescription').value;
    let editDueDate = document.getElementById('editDueDate').value;
    let editPriority = document.getElementById('editPriority').value;
    let editComplete = false
    let task = new Task(editName, editDescription,editDueDate,editPriority,editComplete)
    Storage.updateTask(project,taskId, task);
    populateTable(Storage.getToDo().getProject(project));
    updateTask.reset()
    closeModal();
}

//submit taskForm to add new task
taskForm.onsubmit = function() {
    let taskNam = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let projDrop = document.querySelector('#projectSelect').selectedOptions[0].value;
    let dueDate = document.getElementById('duedate').value;
    let priority = document.getElementById('priority').value;
    let newTask = new Task(taskNam,description,dueDate,priority);
    let projectSelect = Storage.getToDo().getProject(projDrop);
    Storage.addTask(projectSelect.title, newTask);
    taskForm.reset();
    renderProjects();
    populateTable(Storage.getToDo().getProject(projectSelect.title));
    setProject(projectSelect.title);
}

//event listeners
projects.forEach(projectNav=> {
    projectNav.addEventListener("click",() => { 
        setProject(projectNav.innerHTML);
        let proj = Storage.getToDo().getProject(projectNav.getAttribute('value'));
        populateTable(proj);
    });
});

projectFormSelect.forEach(selector => {
    selector.addEventListener("click",function () {
        this.innerHTML = ''
            let placeholder = document.createElement("OPTION")
            placeholder.value = ''
            placeholder.innerHTML = 'Choose Project';
            placeholder.disabled = true
            this.appendChild(placeholder);
            Storage.getToDo().projects.forEach(project => {
                if(project.title !== "Today" && project.title !== "This Week"){
                    let optionSelector = document.createElement("OPTION");
                    optionSelector.innerHTML = project.title;
                    optionSelector.value =  project.title;
                   this.appendChild(optionSelector);
                } ;
            });
    });
});

newProject.addEventListener('click', addProject);
btnCloseEdit.addEventListener("click",closeModal);
document.addEventListener('load',loadProjects());
todayBtn.addEventListener('click',() => {
    Storage.updateToday()
    let p= Storage.getToDo().getProject('Today')
    populateTable(p);
    setProject(p.title);
});
thisWeekBtn.addEventListener('click',() => {
    Storage.updateWeek()
    let p= Storage.getToDo().getProject('This Week')
    populateTable(p);
    setProject(p.title);
}
    );