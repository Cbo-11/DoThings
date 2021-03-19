import Project from './project.js';

var project;
//dom control 
let taskTable = document.querySelector('#taskTable');
let projectTitle = document.querySelector('#currentProject');

//Set Selected Project
var setProject = (projectName) => {
    var title = document.getElementById("currentProject");
    title.innerHTML = projectName;
};

var addProject = () =>{
    let projectName = prompt("Please Name This Project");
    if(projectName !=="") {
        var projectList = document.getElementById('projectList');
        var projectLi = document.createElement('li');
        var projectPill = document.createElement('span');
        projectPill.classList.add("badge", "bg-primary", "rounded-pill");
        projectPill.innerHTML =  0;
        projectLi.classList.add('project', 'list-group-item','list-group-item-action','d-flex','justify-content-between', 'align-items-center');
        projectLi.href = "#";
        let p = new Project;
        p.setProjectName(projectName);
        projectLi.innerHTML = p.name;
        projectLi.appendChild(projectPill);
        projectList.appendChild(projectLi);
        projectLi.addEventListener("click",() => { 
            setProject(projectLi.innerHTML.split('<span')[0]);
        });
    } ;
}
export default class UI {

    static loadTasks(projectName) {
        getToDoList()
        .getProject(project)
        .getTasks()
        .forEach((task) => UI.createTasks( task.title, task.description,task.dueDate, task.priority, task.complete));
        if (projectName !== 'Today' &&  projectName !== 'ThisWeek') {
            UI.tableTasks();
        };
    };
};

//event listeners
const projects = document.querySelectorAll('.project')
const newProject = document.querySelector('.newProject')

projects.forEach(project => {
    project.addEventListener("click",() => { 
        setProject(project.innerHTML);
    });
});

newProject.addEventListener('click', addProject)
