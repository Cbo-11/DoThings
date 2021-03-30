import { isToday, isThisWeek, toDate, subDays } from "date-fns";
import Task from "./task";

export default class Project {
  constructor(name) {
    this.title = name;
    this.tasks = [];
  }

  setProjectName(name) {
    this.title = name;
  }

  getProjectName() {
    return this.title;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskName) {
    return this.tasks.find((task) => task.getTaskName() === taskName);
  }

  deleteTask(taskName) {
    const taskDel = this.tasks.find((task) => task.getTaskName() === taskName);
    this.tasks.splice(this.tasks.indexOf(taskDel), 1);
  }

  addTask(task) {
    if (this.tasks.indexOf(task) > 0) return;
    this.tasks.push(task);
  }

  getWeeksTasks() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isThisWeek(subDays(toDate(taskDate), 1), 1);
    });
  }

  getTodaysTasks() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted());
      return isToday(toDate(taskDate));
    });
  }
}
