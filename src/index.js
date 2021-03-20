import Project from './project.js';
import ProjectList from './projectsControl'
import Task from './task'

var project;
var projectslist = new ProjectList
//dom control 
let taskTable = document.querySelector('#taskTable');
let projectTitle = document.querySelector('#currentProject');

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
        //TODO Sort the below ProjectList functions typeerror 
        let p = new Project(projectName);
        projectslist.addToProjectList(p);
        projects.addToProjects(p);
    } ;
};

var addToProjectList = (project) => {
        var projectList = document.getElementById('projectList');
        var projectLi = document.createElement('li');
        var projectPill = document.createElement('span');
        projectPill.classList.add("badge", "bg-primary", "rounded-pill");
        projectPill.innerHTML =  0;
        projectLi.classList.add('project', 'list-group-item','list-group-item-action','d-flex','justify-content-between', 'align-items-center');
        projectLi.href = "#";
        projectLi.innerHTML = p.name;
        projectLi.appendChild(projectPill);
        projectList.appendChild(projectLi);
        projectLi.addEventListener("click",() => { 
            setProject(projectLi.innerHTML.split('<span')[0]);
            populateTable(p);
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

//event listeners
const projects = document.querySelectorAll('.project')
const newProject = document.querySelector('.newProject')

projects.forEach(project => {
    project.addEventListener("click",() => { 
        setProject(project.innerHTML);
        populateTable(project);
    });
});

newProject.addEventListener('click', addProject)
