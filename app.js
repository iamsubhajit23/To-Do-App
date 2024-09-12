let inputTask = document.querySelector("#input");
let addBtn = document.querySelector("#btn");
let incompleteTask = document.querySelector("#incompleted-task");
let completeTask = document.querySelector("#completed-task");

let createNewTaskElement = function (taskString) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editBtn = document.createElement("button");
    let editInput = document.createElement("input");
    let deleteBtn = document.createElement("button");

    label.innerText = taskString;  
    checkBox.type = "checkbox";
    editInput.type = "text";

    editBtn.innerText = "Edit";
    editBtn.className = "edit";
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);  
    listItem.appendChild(editBtn);
    listItem.appendChild(editInput);
    listItem.appendChild(deleteBtn);

    return listItem;
};


let addTask = function () {
    let listItem = createNewTaskElement(inputTask.value);

    if (inputTask.value == "") {
        return;
    }
    incompleteTask.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    inputTask.value = "";
}

let editTask = function () {
    let listItem = this.parentNode;

    let editInput = listItem.querySelector("input[type =text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
}

let deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;

    ul.removeChild(listItem);
}

let taskCompleted = function () {
    let listItem = this.parentNode;
    completeTask.appendChild(listItem);
    bindTaskEvents(listItem, taskIncompleted);
}

let taskIncompleted = function () {
    let listItem = this.parentNode;
    completeTask.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted)
}

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

addBtn.addEventListener("click", addTask);

for(let i=0; i<incompleteTask.children.length; i++){
    bindTaskEvents(incompleteTask.children[i],taskCompleted);
}

for(let i=0; i<completeTask.children.length; i++){
    bindTaskEvents(completeTask.children[i],taskIncompleted);
}