"use strict";
let drag = null;
let dragItem = function () {
  let textAll = document.querySelectorAll(".task-content");
  textAll.forEach((item) => {
    item.addEventListener("dragstart", function () {
      drag = item;
    });
    item.addEventListener("dragend", function () {
      drag = null;
    });

    let mainDiv = document.querySelectorAll(".tasks");
    mainDiv.forEach((box) => {
      box.addEventListener("dragover", function (e) {
        e.preventDefault();
        box.classList.add("hovered");
      });
      box.addEventListener("dragleave", function () {
        box.classList.remove("hovered");
      });
      box.addEventListener("drop", function () {
        box.appendChild(drag);
      });
    });
  });
};

window.addEventListener("load", () => {
  let btn = document.getElementById("btn");
  let input = document.getElementById("text");
  let list_el = document.querySelector(".tasks");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let task = input.value;

    if (!task) {
      alert("Write Task");
      return;
    }

    const task_el = document.createElement("div");
    task_el.classList.add("task-content");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("task");

    const text = document.createElement("input");
    text.setAttribute("type", "text");
    text.setAttribute("readonly", "readonly");
    text.setAttribute("placeholder", "Insert Your Task");
    text.setAttribute("draggable", "true");
    text.value = task;
    text.classList.add("text");
    text.innerText = task;

    // div actions
    const actions = document.createElement("div");
    actions.classList.add("actions");

    // Edit icon
    const icon1 = document.createElement("ion-icon");
    icon1.setAttribute("name", "create-outline");
    icon1.classList.add("edit");
    icon1.addEventListener("click", () => {
      text.removeAttribute("readonly", "readonly");
      text.focus();
    });

    // Delete icon
    const icon2 = document.createElement("ion-icon");
    icon2.setAttribute("name", "trash-outline");
    icon2.classList.add("delete");
    icon2.addEventListener("click", () => {
      text.value = "";
      text.focus();
    });

    task_content_el.appendChild(text);
    actions.appendChild(icon1);
    actions.appendChild(icon2);
    task_el.appendChild(task_content_el);
    task_el.appendChild(actions);
    console.log(task_el.children);
    list_el.appendChild(task_el);
    console.log(list_el.children);
    input.value = "";
    dragItem();
  });
});
