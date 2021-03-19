export default class  Project {

    constructor(name) {
    this.title =  name;
    this.tasks = [];
    }

    setProjectName(name) {
        this.name = name;
    }

    getProjectName(){
        return this.name;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTasks() {
        return this.tasks;
    }

    getTask (taskName) {
        return this.tasks.find((task) => task.getName() === taskName);
    }

    deleteTask(taskName) {
        const taskDel = this.tasks.find((task) => task.getName() === taskName);
        this.tasks.splice(this.tasks.indexOf(taskDel),1);
    }

}
