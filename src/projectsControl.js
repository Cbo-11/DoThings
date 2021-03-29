import Project from './project';
import Task from './task';

export default class ProjectList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('Today'));
    this.projects.push(new Project('This Week'));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((pr) => pr.getProjectName() === projectName);
  }

  addToProjectList(project) {
    if (this.projects.indexOf(project) > 0) return;
    this.projects.push(project);
  }

  deleteProject(projectName) {
    const projectDel = this.projects.find(
      (project) => project.getProjectName() === projectName,
    );
    this.projects.splice(this.projects.indexOf(projectDel), 1);
  }

  updateWeekTasks() {
    this.getProject('This Week').tasks = [];

    this.projects.forEach((project) => {
      if (project.getProjectName() === 'Today' || project.getProjectName() === 'This Week') return;
      const thisWeekTasks = project.getWeeksTasks();
      thisWeekTasks.forEach((task) => {
        this.getProject('This Week').addTask(new Task(task.title, task.description, task.dueDate, task.priority));
      });
    });
  }

  updateTodayTasks() {
    this.getProject('Today').tasks = [];

    this.projects.forEach((project) => {
      if (project.getProjectName() === 'Today' || project.getProjectName() === 'This Week') return;
      const thisWeekTasks = project.getTodaysTasks();
      thisWeekTasks.forEach((task) => {
        this.getProject('Today').addTask(new Task(task.title, task.description, task.dueDate, task.priority));
      });
    });
  }
}
