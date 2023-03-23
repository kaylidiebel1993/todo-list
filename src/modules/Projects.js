import ItemModel from './models/item.model'; 
import DisplayController from './Display'; 
import ProjectModel from './models/project.model'; 

class Projects {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || []; 
    }

    createProject(title) {
        const newProject = new ProjectModel(title); 
        this.projects.push(newProject); 
        localStorage.setItem("projects", JSON.stringify(this.projects)); 
    }

    removeProject(projId) {
        let workingProj = this.projects.find(p => p.id === projId); 
        this.projects = this.projects.filter(proj => proj.id != workingProj.id); 
        localStorage.setItem("projects", JSON.stringify(this.projects)); 
    }

    addItem(title, dueDate, description, priority, completionStatus, projId) {
        let newItem = new ItemModel(title, dueDate, description, priority, completionStatus); 
        this.projects.find(p => p.id === projId).todos.push(newItem); 
        localStorage.setItem("projects", JSON.stringify(this.projects)); 
    }

    editItem(title, dueDate, description, priority, completionStatus, projId, itemId) {
        let workingProj = this.projects.find(p => p.id === projId); 
        let workingItem = workingProj.todos.find(i => i.id === itemId.id); 

        workingItem.title = title; 
        workingItem.dueDate = dueDate; 
        workingItem.description = description; 
        workingItem.priority = priority; 
        workingItem.completionStatus = completionStatus; 
        localStorage.setItem("projects", JSON.stringify(this.projects)); 
    }

    removeItem(projId, itemId) {
        let workingProj = this.projects.find(p => p.id === projId); 
        let workingItem = workingProj.todos.find(i => i.id === itemId); 
        workingProj.todos = workingProj.todos.filter(todo => todo.id != workingItem.id); 
        localStorage.setItem("projects", JSON.stringify(this.projects)); 
    }
}

export default Projects; 