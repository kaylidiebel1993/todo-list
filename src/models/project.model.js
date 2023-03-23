const { v4: uuidv4 } = require('uuid'); 

class ProjectModel {
    constructor(title, todos = []) {
        this.id = uuidv4();
        this.title = title; 
        this.todos = todos;  
    }
}

export default ProjectModel; 