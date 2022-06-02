// variabels
let input = document.querySelector(".input"),
  submit = document.querySelector(".add"),
  taskDiv = document.querySelector(".tasks"),
  arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// trigger get data from localstorge function
getDataFromLocalStorge();
// Add task
submit.addEventListener("click", submitTask);

// on click enter
document.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    validateForm();
    submitTask();
  }
});

// submit task
function submitTask() {
  if (input.value !== "") {
    addTaskToArray(input.value); // add task to array
    input.value = "";
  } else {
    Toastify({
      text: "please, Enter your task",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ff0000",
        borderRadius: "1rem",
      },
    }).showToast();
  }
}

// func add task to array
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    isCompleted: false,
  };
  arrayOfTasks.unshift(task);
  // console.log(arrayOfTasks);
  // add tasks to localstorge
  addDataToLocalStorgeFrom(arrayOfTasks);
  // add tasks to page
  addElementToPageFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
  // empty task div
  taskDiv.innerHTML = "";

  // looping in array of tasks
  arrayOfTasks.forEach((task) => {
    const { id, title, isCompleted } = task;
    // create div
    let div = document.createElement("div");
    div.className = "task";

    div.setAttribute("data-id", id);
    let text = document.createElement("textarea");
    text.setAttribute("readonly", true);
    text.appendChild(document.createTextNode(title));
    div.appendChild(text);

    // create buttonDel as span
    let buttonsCont = document.createElement("div");
    let spanDel = document.createElement("span");
    spanDel.className = "edit";
    spanDel.appendChild(document.createTextNode("Edit"));

    // create buttonUpdate as span
    let spanEdit = document.createElement("span");
    spanEdit.className = "del";
    spanEdit.appendChild(document.createTextNode("Delete"));

    buttonsCont.appendChild(spanDel);
    buttonsCont.appendChild(spanEdit);

    div.appendChild(buttonsCont);
    // console.log(div);

    // add div to taskDiv as child
    taskDiv.appendChild(div);
  });
}

// remove and update item
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.parentElement.remove();
    // remove from local storge
    removeTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
  if (e.target.classList.contains("edit")) {
    // console.log(e.target.parentElement.parentElement.innerText);
    let textEdited = e.target.parentElement.parentElement.firstChild.innerHTML;
    input.value = textEdited;
    e.target.parentElement.parentElement.remove();
    removeTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
});

function addDataToLocalStorgeFrom(arrayOfTasks) {
  // console.log(arrayOfTasks);
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorge() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    // console.log(tasks);
    addElementToPageFrom(tasks);
  }
}

function removeTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  // console.log(arrayOfTasks);
  addDataToLocalStorgeFrom(arrayOfTasks);
}
