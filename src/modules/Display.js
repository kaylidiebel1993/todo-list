import Projects from './Projects'; 
import { format } from 'date-fns'; 

class DisplayController {
    constructor() {
        // Grabbing the hard coded app div 
        this.appDiv = document.getElementById("app"); 

        this.projectsModel = new Projects(); 

        this.containerDiv = document.createElement("div"); 
        this.containerDiv.id = "container"; 
        this.contentDiv = document.createElement("div"); 
        this.contentDiv.id = "content"; 
        this.appDiv.appendChild(this.containerDiv); 

        this.createSidebar(); 
        this.projectsModel = JSON.parse(localStorage.getItem("projects")); 
        this.renderProject(this.projects[0].id);
        console.log(this.projectsModel); 
    }

    createSidebar() {
        this.sidebarDiv = document.createElement("div");
        this.logoDiv = document.createElement("div");
        this.logoImage = document.createElement("i"); 
        this.logoHR = document.createElement("hr"); 
        this.sidebarContainerDiv = document.createElement("div"); 
        this.sidebarHR = document.createElement("hr");
        this.userProjectsUL = document.createElement("ul"); 
        this.addProjectBtn = document.createElement("button");
        this.addProjectIco = document.createElement("i"); 
        this.projectBtnSpan = document.createElement("span"); 

        this.sidebarDiv.id = "sidebar"; 
        this.logoDiv.classList.add("logo"); 
        this.logoImage.classList.add("logo-icon", "fas", "fa-th-list", "fa-2x");
        this.sidebarContainerDiv.id = "sidebar-container"; 
        this.sidebarHR.classList.add("sidebar-container-hr"); 
        this.userProjectsUL.classList.add("user-projects"); 
        this.addProjectBtn.classList.add("add-project-btn"); 
        this.addProjectIco.classList.add("fas", "fa-plus", "project-btn"); 
        this.projectBtnSpan.classList.add("add-task-text"); 

        this.containerDiv.appendChild(this.sidebarDiv); 
        this.sidebarDiv.appendChild(this.logoDiv);
        this.logoDiv.appendChild(this.logoImage);
        this.logoDiv.appendChild(this.logoHR);
        this.sidebarDiv.appendChild(this.sidebarContainerDiv);
        this.sidebarContainerDiv.appendChild(this.userProjectsUL);
        this.sidebarContainerDiv.appendChild(this.addProjectBtn);
        this.addProjectBtn.appendChild(this.addProjectIco);
        this.addProjectBtn.appendChild(this.projectBtnSpan);
        this.projectBtnSpan.innerText = "Add Project";

        let projectList = JSON.parse(localStorage.getItem('projects'));
        this.renderProjectList(projectList); 

        this.addProjectBtn.addEventListener("click", () => {
            let eventProjCont = new Projects(); 
            let projTitle = prompt("Project Title: ");
            eventProjCont.createProject(projTitle); 
            let updatedProjects = JSON.parse(localStorage.getItem('projects'));
            this.renderProject(updatedProjects[updatedProjects.length-1].id);
            this.clearChildNodes("sidebar");
        }); 

        let userProjects = document.querySelectorAll(".project"); 

        userProjects.forEach(project => {
            project.addEventListener("click", event => {
                userProjects.forEach(project => {
                    project.classList.remove("project-active");
                }); 
                this.renderProject(event.target.dataset.id); 
                project.classList.add("project-active"); 
            }); 
        }); 
    }

    renderProjectList(projects) {
        if (projects) {
            for (let i = 0; i < projects.length; i++) {
                this.projectLi = document.createElement("li"); 
                this.projectLi.classList.add("project");
                this.projectLi.setAttribute("data-id", projects[i].id); 
                this.projectLi.textContent = projects[i].title;
                this.userProjectsUL.appendChild(this.projectLi); 
            }
        }
    }

    renderProject(projId) {
        let updatedProjects = JSON.parse(localStorage.getItem('projects'));
        let projItems = updatedProjects.find(p => p.id === projId).todos; 
        let currentProj = projId; 

        this.clearChildNodes("content"); 

        this.contentContainerDiv = document.createElement("div"); 
        this.contentHeaderDiv = document.createElement("div"); 
        this.currentTitleSpan = document.createElement("span");
        this.projectSettingsDiv = document.createElement("div"); 
        this.projectSettingsIcon = document.createElement("i");
        this.contentBodyDiv = document.createElement("div");
        this.itemDiv = document.createElement("div"); 
        this.addItemBtnDiv = document.createElement("div"); 
        this.addItemIco = document.createElement("i");
        this.addItemSpan = document.createElement("span"); 

        this.contentContainerDiv.id = "content-container";
        this.contentHeaderDiv.classList.add("content-header");
        this.currentTitleSpan.classList.add("current-project-title");
        this.projectSettingsDiv.classList.add("settings-icon"); 
        this.projectSettingsIcon.classList.add("far", "fa-trash-alt", "fa-lg");
        this.contentBodyDiv.classList.add("content-body"); 
        this.itemDiv.classList.add("items"); 
        this.addItemBtnDiv.classList.add("add-item-btn");
        this.addItemIco.classList.add("fas", "fa-plus", "item-btn"); 
        this.addItemSpan.classList.add("add-item-text"); 

        this.currentTitleSpan.innerText = updatedProjects.find(p => p.id === projId); 
        this.currentTitleSpan.setAttribute("data-id", projId);
        
        this.containerDiv.appendChild(this.contentDiv);
        this.contentDiv.appendChild(this.contentContainerDiv);
        this.contentContainerDiv.appendChild(this.contentHeaderDiv);
        this.contentHeaderDiv.appendChild(this.currentTitleSpan); 
        this.projectSettingsDiv.appendChild(this.projectSettingsIcon);
        this.contentHeaderDiv.appendChild(this.projectSettingsDiv);
        this.contentContainerDiv.appendChild(this.contentBodyDiv);

        // Rendering the projects items
        this.renderItems(projId);
        document.querySelectorAll(".item").forEach(item => {
            item.addEventListener("mouseenter", () => {
                item.querySelector(".item-options").style.display = "block";
            }); 
            item.addEventListener("mouseleave", () => {
                item.querySelector(".item-options").style.display = "none"; 
            });
        }); 

        this.contentBodyDiv.appendChild(tis.addItemBtnDiv);
        this.addItemBtnDiv.appendChild(this.addItemIco);
        this.addItemSpan.innerText = "Add Item";
        this.addItemBtnDiv.appendChild(this.addItemSpan); 

        this.itemForm(); 

        let deleteIcons = document.querySelectorAll(".delete-item");
        deleteIcons.forEach(icon => {
            icon.addEventListener("click", (event) => {
                let workingItemId = icon.getAttribute("item-id");
                this.projectsModel.removeItem(projId, workingItemId); 
                this.renderProject(projId); 
            });
        });
        this.projectSettingsDiv.addEventListener("click", () => {
            this.projectsModel.removeProject(projId); 
            this.clearChildNodes("sidebar"); 
            this.renderProject(this.projects[0].id); 
        }); 

        this.addItemBtnDiv.addEventListener("click", () => {
            this.newItemSubmit.removeAttribute("item-id");
            this.formContainer.style.display = "grid"; 
            this.newItemSubmit.setAttribute("btn-type", "new");
            this.formHeaderSpan.innerText = "Add Item";
            this.itemTitleInput.value = "";
            this.itemDescInput.value = "";
            this.prioritySelection.value = ""; 
            this.itemDueDateInput.value = ""; 
        });
        let editIcons = document.querySelectorAll(".item-edit"); 
        editIcons.forEach(icon => {
            icon.addEventListener("click", event => {
                let allProjects = JSON.parse(localStorage.getItem("projects")); 
                let itemId = icon.getAttribute("dataset-id"); 
                this.formContainer.style.display = "grid"; 
                let workingProj = allProjects.find(p => p.id === projId); 
                let workingItem = workingProj.todos.find(i => i.id === itemId); 
                this.formHeaderSpan.innerText = "Edit Item"; 
                this.itemTitleInput.value = workingItem.title; 
                this.itemDescInput.value = workingItem.description; 
                this.prioritySelection.value = workingItem.priority; 
                this.itemDueDateInput.value = workingItem.dueDate; 
                this.newItemSubmit.setAttribute("btn-type", "edit");
                this.newItemSubmit.setAttribute("item-id", itemId); 
            }); 
        }); 
        let completionBoxes = document.getElementsByName("item-status");
        completionBoxes.forEach(box => {
            let itemId = box.getAttribute("item-id"); 
            let workingProj = this.projects.find(p => p.id === projId);
            let workingItem = workingProj.todos.find(i => i.id === itemId);
            box.addEventListener("click", () => {
                if (box.checked === false) {
                    workingItem.completionStatus = false; 
                    localStorage.setItem("projects", JSON.stringify(this.projects));
                    this.clearChildNodes("items");
                    this.renderProject(projId); 
                } else {
                    workingItem.completionStatus = true; 
                    localStorage.setItem("projects", JSON.stringify(this.projects)); 
                    this.clearChildNodes("items"); 
                    this.renderProject(projId); 
                }
            }); 
        });
        this.newItemSubmit.addEventListener("click", () => {
            let title = this.itemTitleInput.value; 
            let dueDate = this.itemDueDateInput.value;
            let desc = this.itemDescInput.value;
            let prio = this.prioritySelection.value; 
            let projectId = this.currentTitleSpan.dataset.id; 
            let completionStatus = false; 
            if (this.newItemSubmit.getAttribute("btn-type") === "new") {
                this.projectsModel.addItem(title, dueDate, desc, prio, completionStatus, projectId);
                this.renderProject(projId); 
            } else if (this.newItemSubmit.getAttribute("btn-type") === "edit") {
                let itemId = this.newItemSubmit.getAttribute("item-id"); 
                this.projectsModel.editItem(title, dueDate, desc, prio, completionStatus, projectId, itemId); 
                this.renderProject(projId); 
            }
        }); 
    }

    renderItems(projId) {
        let updatedProjects = JSON.parse(localStorage.getItem("projects")); 
        let projItems = updatedProjects.find(p => p.id === projId).todos; 

        if (projItems.length > 0) {
            projItems.forEach(item => {
                this.itemContainerDiv = document.createElement("div"); 
                this.itemContainerDiv.classList.add("items-container");
                this.item = document.createElement("div");
                this.item.classList.add("item"); 
                this.itemOptionsDiv = document.createElement("div"); 
                this.itemOptionsDiv.classList.add("item-options"); 
                this.itemOptionsDiv.style.display = "none";
                this.itemEditIcon = document.createElement("i");
                this.itemEditIcon.classList.add("far", "fa-edit", "item-options-icon");
                this.itemEditSection = document.createElement("div"); 
                this.itemEditSection.classList.add("item-edit"); 
                this.itemEditSection.setAttribute("dataset-id", item.id); 
                this.itemDeleteSection = document.createElement("div"); 
                this.itemDeleteSection.classList.add("delete-item"); 
                this.itemDeleteIcon = document.createElement("i"); 
                this.itemDeleteIcon.classList.add("far", "fa-trash-alt", "item-options-icon"); 
                this.itemDeleteIcon.setAttribute("item-id", item.id); 
                this.itemTitleDiv = document.createElement("div");
                this.itemTitleDiv.classList.add('item-title');
                this.itemTitleDiv.innerText = item.title; 
                this.itemTitleDiv.setAttribute("dataset-id", item.id);
                this.itemRowBr = document.createElement("br"); 
                this.dueDateDiv = document.createElement("div"); 
                this.dueDateDiv.classList.add("due-date"); 
                this.dueDateDiv.innerText = item.dueDate; 
                this.itemHr = document.createElement("hr"); 
                this.completionBox = document.createElement("input"); 
                this.completionBox.type = "checkbox"; 
                this.completionBox.classList.add("item-completion-status-box"); 
                this.completionBox.setAttribute("item-id", item.id); 
                this.completionBox.name = "item-status"; 

                this.contentBodyDiv.appendChild(this.itemContainerDiv); 
                this.itemContainerDiv.appendChild(this.item); 
                this.item.appendChild(this.itemOptionsDiv); 
                this.itemDeleteSection.appendChild(this.itemDeleteIcon);
                this.itemEditSection.appendChild(this.itemEditIcon);
                this.itemOptionsDiv.appendChild(this.itemEditSection);
                this.itemOptionsDiv.appendChild(this.itemDeleteSection);
                this.item.appendChild(this.completionBox);
                this.item.appendChild(this.itemTitleDiv); 
                this.item.appendChild(this.itemRowBr);
                this.item.appendChild(this.dueDateDiv); 
                this.itemContainerDiv.appendChild(this.itemHr); 

                if (item.completionStatus === true) {
                    this.completionBox.checked = true; 
                    this.itemContainerDiv.classList.add("completed-item"); 
                } else {
                    this.completionBox.checked = false; 
                    this.itemContainerDiv.classList.remove("completed-item"); 
                }

                if (item.priority === "High") {
                    this.dueDateDiv.classList.add("priority-high");
                } else if (item.priority === "Medium") {
                    this.dueDateDiv.classList.add("priority-medium"); 
                } else if (item.priority === "Low") {
                    this.dueDateDiv.classList.add("priority-low");
                }
            });
        }
    }

    itemForm() {
        const priorities = ["High", "Medium", "Low"]; 

        this.formContainer = document.createElement("div"); 
        this.formContainer.classList.add("new-item-form"); 
        this.formHeader = document.createElement("div");
        this.formHeader.classList.add("form-header"); 
        this.formHeaderSpan = document.createElement("span"); 
        this.formHeaderSpan.innerTxt = "New Item"; 
        this.formHeaderSpan.classList.add("form-header-span"); 
        this.closeForm = document.createElement("div"); 
        this.closeForm.classList.add("close-form"); 
        this.closeFormIcon = document.createElement("i"); 
        this.closeFormIcon.classList.add("fas", "fa-times", "close-form-icon"); 
        this.newItemForm = document.createElement("form"); 
        this.itemTitleInput = document.createElement("input"); 
        this.itemTitleInput.type = "text"; 
        this.itemTitleInput.name = "item-name-input"; 
        this.itemTitleInput.placeholder = "Title: Example Item"; 
        this.itemTitleInput.classList.add("item-name-input"); 
        this.itemDescInput = document.createElement("textarea");
        this.itemDescInput.wrap = "soft"; 
        this.itemDescInput.placeholder = "Item Description...";
        this.itemDescInput.classList.add("item-desc-input"); 
        this.prioritySelection = document.createElement("select"); 
        this.prioritySelection.classList.add("priority-selection"); 
        this.prioritySelection.name = "priorities"; 
        this.itemDueDateInput = document.createElement("input"); 
        this.itemDueDateInput.type = "date"; 
        this.itemDueDateInput.classList.add("item-duedate-input"); 
        this.newItemSubmit = document.createElement("input"); 
        this.newItemSubmit.type = "submit"; 
        this.newItemSubmit.setAttribute("btn-type", "new-item"); 
        this.prioOptionDisabled = document.createElement("input"); 
        this.prioOptionDisabled.value = ""; 
        this.prioOptionDisabled.selected = "selected"; 
        this.prioOptionDisabled.disabled = "disabled"; 
        this.prioOptionDisabled.innerText = "Select Priority";
        this.prioritySelection.appendChild(this.prioOptionDisabled); 

        this.contentBodyDiv.appendChild(this.formContainer);
        this.formContainer.appendChild(this.formHeader);
        this.formHeader.appendChild(this.formHeaderSpan); 
        this.formHeader.appendChild(this.closeForm);
        this.closeForm.appendChild(this.closeFormIcon); 
        this.formContainer.appendChild(this.newItemForm);
        this.newItemForm.appendChild(this.itemTitleInput); 
        this.newItemForm.appendChild(this.itemDescInput); 
        this.newItemForm.appendChild(this.prioritySelection);
        this.newItemForm.appendChild(this.itemDueDateInput);
        this.newItemForm.appendChild(this.newItemSubmit); 

        for (let i = 0; i < priorities.length; i++) {
            this.prioOption = document.createElement("option"); 
            this.prioOption.value = priorities[i]; 
            this.prioOption.innerText = priorities[i]; 
            this.prioOption.classList.add("option-text"); 
            this.prioritySelection.appendChild(this.prioOption); 
        }
        this.closeForm.addEventListener("click", () => {
            this.formContainer.style.display = "none"; 
            this.itemTitleInput.value = ""; 
            this.itemDescInput.value = ""; 
        }); 
    }

    clearChildNodes(area) {
        if (area === "content") {
            if (this.contentDiv.firstElementChild) {
                while (this.contentContainerDiv.firstElementChild) {
                    this.contentContainerDiv.removeChild(this.contentContainerDiv.firstElementChild); 
                }
            }
            while (this.contentDiv.firstElementChild) {
                this.contentDiv.removeChild(this.contentDiv.firstElementChild);
            }
            if (this.containerDiv.lastElementChild.id === "content") {
                this.containerDiv.removeChild(this.contentDiv); 
            }
        } else if (area === "items") {
            while (this.itemOptionsDiv.firstElementChild) {
                this.itemOptionsDiv.removeChild(this.itemOptionsDiv.firstElementChild); 
            }
            while (this.item.firstElementChild) {
                this.item.removeChild(this.item.firstElementChild); 
            }
            while (this.itemContainerDiv.firstElementChild) {
                this.addProjectBtn.removeChild(this.userProjectsUL.firstElementChild); 
            }
        } else if (area === "sidebar") {
            while (this.addProjectBtn.firstElementChild) {
                this.addProjectBtn.removeChild(this.addProjectBtn.firstElementChild); 
            }
            while (this.userProjectsUL.firstElementChild) {
                this.userProjectsUL.removeChild(this.userProjectsUL.firstElementChild); 
            }
            while (this.logoDiv.firstElementChild) {
                this.logoDiv.removeChild(this.logoDiv.firstElementChild); 
            } 
            while (this.sidebarContainerDiv.firstElementChild) {
                this.sidebarContainerDiv.removeChild(this.sidebarContainerDiv.firstElementChild); 
            }
            while (this.sidebarDiv.firstElementChild) {
                this.sidebarDiv.removeChild(this.sidebarDiv.firstElementChild); 
            }
            this.containerDiv.removeChild(this.sidebarDiv); 
            this.createSidebar(); 
        } else if (area === "all") {
            while (this.containerDiv.firstElementChild) {
                this.containerDiv.removeChild(this.containerDiv.firstElementChild); 
            }
        }
    }
}

export default DisplayController; 