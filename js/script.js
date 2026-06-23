// ===============================
// MOTIVATIONAL QUOTE GENERATOR
// ===============================

const quotes = [
"Cybersecurity is much more than a matter of IT.",
"Success is built one day at a time.",
"Learning never exhausts the mind.",
"The best way to predict the future is to create it.",
"Code, Learn, Improve, Repeat.",
"Small progress is still progress."
];

const quoteElement = document.getElementById("quote");

if (quoteElement) {
const randomQuote =
quotes[Math.floor(Math.random() * quotes.length)];

quoteElement.textContent = randomQuote;

}

// ===============================
// ACADEMIC TASK PLANNER
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent.toLowerCase().includes(filter));
    });
    renderTasks();
}

function updateTaskStats() {

if (!totalTasks || !completedTasks) return;

totalTasks.textContent = tasks.length;

const completedCount =
    tasks.filter(task => task.completed).length;

completedTasks.textContent = completedCount;

}

function renderTasks() {
    if (!taskList) return;

    taskList.innerHTML = "";

    const visibleTasks = tasks
        .map((task, index) => ({ task, index }))
        .filter(item => {
            if (currentFilter === "pending") return !item.task.completed;
            if (currentFilter === "completed") return item.task.completed;
            return true;
        });

    visibleTasks.forEach(({ task, index }) => {
        const li = document.createElement("li");
        li.className = "task-item";
        if (task.completed) {
            li.classList.add("completed");
        }

        const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date";
        const priorityClass = task.priority === "High" ? "priority-high" : task.priority === "Low" ? "priority-low" : "priority-medium";

        li.innerHTML = `
            <div class="task-details">
                <strong>${task.text}</strong>
                <div class="task-meta">
                    <span class="priority-chip ${priorityClass}">${task.priority} Priority</span>
                    <span>Due: ${formattedDate}</span>
                </div>
            </div>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateTaskStats();
    saveTasks();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDate");
    const prioritySelect = document.getElementById("prioritySelect");

    if (!taskInput || !dueDateInput || !prioritySelect) return;

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: taskText,
        dueDate: dueDate,
        priority: priority,
        completed: false
    });

    taskInput.value = "";
    dueDateInput.value = "";
    prioritySelect.value = "Medium";

    renderTasks();
}

function toggleTask(index) {

tasks[index].completed =
    !tasks[index].completed;

renderTasks();

}

function deleteTask(index) {

tasks.splice(index, 1);

renderTasks();

}

if (taskList) {
renderTasks();
}

// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm =
document.getElementById("contactForm");

if (contactForm) {

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const formMessage =
        document.getElementById("formMessage");

    // Empty field validation

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;
    }

    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        return;
    }

    // Phone validation

    const phonePattern =
        /^[0-9]+$/;

    if (!phonePattern.test(phone)) {

        formMessage.textContent =
            "Phone number must contain only digits.";

        return;
    }

    // Message length validation

    if (message.length < 10) {

        formMessage.textContent =
            "Message must contain at least 10 characters.";

        return;
    }

    formMessage.textContent =
        "Message sent successfully!";

    contactForm.reset();

});

}

// ===============================
// CURRENT YEAR IN FOOTER
// ===============================

const footerText =
document.querySelector("footer p");

if (footerText) {

const currentYear =
    new Date().getFullYear();

footerText.innerHTML =
    `© ${currentYear} Henry Muoneke | Cybersecurity Portfolio`;

}
