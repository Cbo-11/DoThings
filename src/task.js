//create factory function for task creation, update

task = (title, description, dueDate,priority, project) => {
    this.title =  title 
    this.description = description
    this.dueDate = dueDate
    this.priority = priority  
    this.complete = false
    this.project = project
}

var updateTask = (task) => {
    this.title =  a
    this.description = b
    this.dueDate = c
    this.priority =  d
    this.complete = e
}



export default {task, updateTask}