export default class Task {
  constructor(title, description, dueDate, priority) {
    this.complete = false;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getTaskName() {
    return this.title;
  }

  updateTask(title, description, dueDate, complete, priority) {
    this.complete = complete;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setTaskComplete() {
    if (this.complete === false) {
      this.complete = true;
    } else {
      this.complete = false;
    }
  }

  getDate() {
    return this.dueDate;
  }

  getDateFormatted() {
    const day = this.dueDate.split("/")[2];
    const month = this.dueDate.split("/")[1];
    const year = this.dueDate.split("/")[0];
    return `${month}/${day}/${year}`;
  }
}
