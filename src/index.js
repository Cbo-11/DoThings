import Project from './project.js';
import ProjectList from './projectsControl'
import Task from './task'

var project;
var loadedProjects = new ProjectList
//dom control 
let taskTable = document.querySelector('#taskTable');
let projectTitle = document.querySelector('#currentProject');
let taskList = document.getElementById('taskList')
const projects = document.querySelectorAll('.project');
const newProject = document.querySelector('.newProject');
const projectFormSelect = document.querySelector('#projectSelect');
const btnAddTask = document.querySelector('#addTaskBtn');
var taskForm = document.getElementById('taskForm')

//Set Selected Project
var setProject = (projectName) => {
    var title = document.getElementById("currentProject");
    title.innerHTML = projectName;
    project = projectName
};

//add a new project 
var addProject = () =>{
    let projectName = prompt("Please Name This Project");
    if(projectName !=="") {
        let p = new Project(projectName);
        loadedProjects.addToProjectList(p);
        renderProjects();
    } ;
};

var renderProjects= () => {
    var projectList = document.getElementById('projectList');
    projectList.innerHTML = ''
        loadedProjects.projects.forEach((project) => {
        if(project.title !== "All Tasks" && project.title !== "Today" && project.title !== "This Week"){
        var projectLi = document.createElement('li');
        var projectPill = document.createElement('span');
        projectPill.classList.add("badge", "bg-primary", "rounded-pill");
        projectPill.innerHTML =  project.tasks.length;
        projectLi.classList.add('project', 'list-group-item','list-group-item-action','d-flex','justify-content-between', 'align-items-center');
        projectLi.href = "#";
        projectLi.innerHTML = project.title;
        projectLi.value = project.title;
        projectLi.appendChild(projectPill);
        projectList.appendChild(projectLi);
        projectLi.addEventListener("click",() => { 
            setProject(project.title);
            populateTable(project);

        });
    }
    })
}

//populate table with project tasks
var populateTable = (i) => {
    clearTable()
    i.tasks.forEach((task) => {
        let row = document.createElement('tr');
        for(var prop in task) {
            if(!task.hasOwnProperty(prop)) continue
            let cell = document.createElement('td');
            cell.innerText = task[prop];
            row.appendChild(cell);
        };
    taskList.appendChild(row);
});
};

var clearTable = () => {
    taskList.innerHTML = "";
}

//update form select drop down

var updateProjectSelect = () =>{
    projectFormSelect.innerHTML = ''
        let placeholder = document.createElement("OPTION")
        placeholder.value = ''
        placeholder.innerHTML = 'Choose Project';
        placeholder.disabled = true
        projectFormSelect .appendChild(placeholder);
        loadedProjects.projects.forEach(project => {
            if(project.title !== "All Tasks" && project.title !== "Today" && project.title !== "This Week"){
                let optionSelector = document.createElement("OPTION");
                optionSelector.innerHTML = project.title;
                optionSelector.value =  project.title;
                projectFormSelect .appendChild(optionSelector);
            } 
        });
}

//submit taskForm to add new task
taskForm.onsubmit = function() {
    let taskNam = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let projDrop = document.querySelector('#projectSelect').selectedOptions[0].value;
    let dueDate = document.getElementById('duedate').value;
    let priority = document.getElementById('priority').value;
    let newTask = new Task(taskNam,description,dueDate,priority);
    let projectSelect = loadedProjects.getProject(projDrop);
    projectSelect.addTask(newTask);
    taskForm.reset();
    renderProjects();
    populateTable(projectSelect);
    setProject(projectSelect.title);
}


//event listeners
projects.forEach(projectNav=> {
    projectNav.addEventListener("click",() => { 
        setProject(projectNav.innerHTML);
        let proj = loadedProjects.getProject(projectNav.getAttribute('value'));
        populateTable(proj);
    });
});

newProject.addEventListener('click', addProject);
projectFormSelect.addEventListener("click",updateProjectSelect);

