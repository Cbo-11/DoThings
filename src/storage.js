import Task from "./task";
import ProjectList from "./projectsControl";
import Project from "./project";

export default class Storage {
  static saveList(list) {
    localStorage.setItem("loadedProjects", JSON.stringify(list));
  }

  static getToDo() {
    const loadedProjects = Object.assign(
      new ProjectList(),
      JSON.parse(localStorage.getItem("loadedProjects"))
    );

    loadedProjects.setProjects(
      loadedProjects
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    loadedProjects
      .getProjects()
      .forEach((project) =>
        project.setTasks(
          project.getTasks().map((task) => Object.assign(new Task(), task))
        )
      );
    return loadedProjects;
  }

  static addProject(project) {
    const projectList = Storage.getToDo();
    projectList.addToProjectList(project);
    Storage.saveList(projectList);
  }

  static deleteProject(projectName) {
    const projectList = Storage.getToDo();
    projectList.deleteProject(projectName);
    Storage.saveList(projectList);
  }

  static addTask(projectName, task) {
    const projectList = Storage.getToDo();
    projectList.getProject(projectName).addTask(task);
    Storage.saveList(projectList);
  }

  static deleteTask(projectName, task) {
    const projectList = Storage.getToDo();
    projectList.getProject(projectName).deleteTask(task.title);
    Storage.saveList(projectList);
  }

  static updateTask(projectName, taskId, task) {
    const projectList = Storage.getToDo();
    projectList
      .getProject(projectName)
      .getTask(taskId)
      .updateTask(
        task.title,
        task.description,
        task.dueDate,
        task.complete,
        task.priority
      );
    Storage.saveList(projectList);
  }

  static completeTask(projectName, taskName) {
    const projectList = Storage.getToDo();
    projectList.getProject(projectName).getTask(taskName).setTaskComplete();
    Storage.saveList(projectList);
  }

  static updateToday() {
    const projectList = Storage.getToDo();
    projectList.updateTodayTasks();
    Storage.saveList(projectList);
  }

  static updateWeek() {
    const projectList = Storage.getToDo();
    projectList.updateWeekTasks();
    Storage.saveList(projectList);
  }
}
