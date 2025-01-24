function ValidateForm() {
    let taskDescription = document.getElementById('task').value;
    if (taskDescription == "") {
        alert('Debe ingresar una tarea');
        return false;
    }
    else {
        return true;
    }
}
function ReadData() {
    let listTask;
    if (localStorage.getItem('listTask') == null) {
        listTask = [];
    } else {
        listTask = JSON.parse(localStorage.getItem('listTask'));
    }
    var html = "";
    listTask.forEach(function (element, index) {
        html += `<div  class="task-container">`;
        if (element.finalizada == false) {
            html += `<input type="text" readonly id="task-id${index}" class="task-input-container" value="${element.taskDescription}">`
            html += `<button class="btn-input-task" onclick="DeleteTask(${index})">`
            html += `<img src="icons8-eliminar-parakeet-color-32.png" alt="icon-delete">`;
            html += `</button>`
            html += `<button class="show-checkbox" id="checkbox-finish"  onclick="FinishTask(${index})">`
            html += `<img src="icons8-checkbox-blue-ui-32.png" alt="check-desmarcado">`
            html += `</button>`
        } else {
            html += `<input type="text" readonly id="task-id${index}" class="task-input-container" style="text-decoration: line-through; color:black;" value="${element.taskDescription}">`
            html += `<button class="btn-input-task" onclick="DeleteTask(${index})">`
            html += `<img src="icons8-eliminar-parakeet-color-32.png" alt="icon-delete">`;
            html += `</button>`
            html += `<button class="show-checkbox" id="checkbox-finish"  onclick="FinishTask(${index})">`
            html += `<img src="icons8-checkbox-30.png" alt="check-marcado">`
            html += `</button>`
        }
html += `</div>`
    })
    document.querySelector('#general-container').innerHTML = html;
}

document.onload = ReadData();

function AddData(event) {
    event.preventDefault();
    if (ValidateForm() == true) {
        let taskDescription = document.getElementById('task').value;
        var listTask;
        if (localStorage.getItem('listTask') == null) {
            listTask = [];
        } else {
            listTask = JSON.parse(localStorage.getItem('listTask'));
        }
        listTask.push({
            taskDescription: taskDescription,
            finalizada: false
        });
        localStorage.setItem('listTask', JSON.stringify(listTask));
        ReadData();
        document.getElementById('task').value = "";
    }
}

function DeleteTask(index) {
    let listTask;
    if (localStorage.getItem('listTask') == null) {
        listTask = [];
    } else {
        listTask = JSON.parse(localStorage.getItem('listTask'));
    }
    listTask.splice(index, 1);
    localStorage.setItem('listTask', JSON.stringify(listTask));
    ReadData();
}

function FinishTask(index) {
    
    let listTask;
    if (localStorage.getItem('listTask') == null) {
        listTask = [];
    } else {
        listTask = JSON.parse(localStorage.getItem('listTask'));
    }
    if (listTask[index].finalizada == false) {
        listTask[index].finalizada = true;
    } else if (listTask[index].finalizada == true) {
        listTask[index].finalizada = false;
    }
    localStorage.setItem('listTask', JSON.stringify(listTask));
    ReadData();
}