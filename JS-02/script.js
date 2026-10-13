const form = document.querySelector('#task-form');
const input = document.querySelector('#task-title');
const filterSelect = document.querySelector('#task-filter');
const countEl = document.querySelector('#task-count');
const list = document.querySelector('#task-list');

const tasks = [];
let currentFilter = 'all'
let nextId = 0




function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) {
        li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.action = 'toggle';

    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Удалить';
    removeBtn.dataset.action = 'delete';

    li.append(checkbox, title, removeBtn);
    return li;
}

function renderTasks() {
    list.innerHTML = ''

    const visible = tasks.filter((task) => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    })
    const fragment = document.createDocumentFragment();
    visible.forEach((task) => fragment.append(createTaskElement(task)));
    list.append(fragment);
    countEl.textContent = `Всего задач: ${tasks.length}`;
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const title = input.value.trim();
    if (title.length === 0) {
        input.focus();
        return;
    }
    if (title.length < 3) {
        alert('Название должно содержать минимум 3 символа.');
        return;
    }

    tasks.push({
        id: nextId++,
        title: title,
        completed: false,
    });

    input.value = '';
    input.focus();
    renderTasks();
});

list.addEventListener('click', (event) => {
    const target = event.target;
    const action = target.dataset.action;

    if (!action) return;

    const li = target.closest('li');

    if (!li) return;

    const id = Number(li.dataset.id);
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) return;

    if (action === 'toggle') {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }
    else if (action === 'delete') {
        tasks.splice(index, 1);
        renderTasks();
    }
});

filterSelect.addEventListener('change', () => {
    currentFilter = filterSelect.value;
    renderTasks();
});

renderTasks();