const { v4: uuidv4 } = require('uuid'); 

class ItemModel {
    constructor(title, dueDate, description, priority, completionStatus=false) {
        this.title = title; 
        this.dueDate = dueDate; 
        this.description = description; 
        this.priority = priority; 
        this.completionStatus = completionStatus; 
        this.id = uuidv4(); 
    }
}

export default ItemModel; 