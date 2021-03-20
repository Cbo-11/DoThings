import Project from "./project";
import Task from './task'

export default class ProjectList {

    constructor() {
    this.projects =  [];
    this.projects.push(new Project('All Tasks'));
    this.projects.push(new Project('Today'));
    this.projects.push(new Project('This Week'));
    }

    getProjects() { 
        return this.projects;
    }

    getProject(projectName) { 
        return this.projects.find((project) => project.getProjectName() === projectName);
    }

    addToProjects(project) {
        //if (this.projects.indexOf(project) > 0) return;
        this.projects.push(project);
    }

    deleteProject(projectName) { 
        const projectDel = this.projects.find(
            (project) => project.getProjectName() === projectName,
        ) ; 
        this.projects.splice(this.projects.indexOf(projectDel),1);
    }
} //end of ProjectList