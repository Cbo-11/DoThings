import Project from './project.js';
import ProjectList from './projectsControl'
import Task from './task'

var project;
var loadedProjects = new ProjectList
//dom control 
let taskTable = document.querySelector('#taskTable');
let projectTitle = document.querySelector('#currentProject');
const projects = document.querySelectorAll('.project');
const newProject = document.querySelector('.newProject');
const projectFormSelect = document.querySelector('.project-select');
const btnAddTask = document.querySelector('#addTaskBtn');

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
        addToProjects(projectName, p);
    } ;
};

var addToProjects = (projectName, project) => {
        var projectList = document.getElementById('projectList');
        var projectLi = document.createElement('li');
        var projectPill = document.createElement('span');
        projectPill.classList.add("badge", "bg-primary", "rounded-pill");
        projectPill.innerHTML =  project.tasks.length;
        projectLi.classList.add('project', 'list-group-item','list-group-item-action','d-flex','justify-content-between', 'align-items-center');
        projectLi.href = "#";
        projectLi.innerHTML = projectName;
        projectLi.appendChild(projectPill);
        projectList.appendChild(projectLi);
        projectLi.addEventListener("click",() => { 
            setProject(projectLi.innerHTML.split('<span')[0]);
            populateTable(project);
        });
}

//populate table with project tasks
var populateTable = (i) => {
    let table = document.getElementById('taskList')
    i.tasks.forEach((task) => {
        let row = document.createElement('tr');
        task.forEach((detail) => {
            let cell = document.createElement('td');
            cell.innerText = detail;
            row.appendChild(cell);
        });
    table.appendChild(row);
});
};

//update form select drop down

var updateProjectSelect = () =>{
    let placeholder = document.getElementById('placeholder')
    
    if(loadedProjects.length !== 0) {
        loadedProjects.projects.forEach(project => {
            if(project.title !== "All Tasks" && project.title !== "Today" && project.title !== "This Week"){
            projectFormSelect.innerHTML = ''
            let optionSelector = document.createElement("OPTION");
            optionSelector.innerHTML = project.title;
            projectFormSelect .appendChild(optionSelector);
            } else {  
                placeholder.innerHTML = 'No Projects Exist';
            }
        });
    } else { 
        placeholder.innerHTML = 'No Projects Exist';
    };
}

//event listeners
projects.forEach(project => {
    project.addEventListener("click",() => { 
        setProject(project.innerHTML);
        populateTable(loadedProjects.getProject(project.value));
    });
});

newProject.addEventListener('click', addProject);
projectFormSelect.addEventListener("click",updateProjectSelect);
//todo btnAddTask.addEventListener('click', );
