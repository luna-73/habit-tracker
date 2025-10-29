// ====== ELEMENT REFERENCES ======
const habitForm = document.getElementById('habit-form');
const habitNameInput = document.getElementById('habit-name');
const habitList = document.getElementById('habit-list');
const saveBtn = document.getElementById('save-progress-btn');
const tasksDoneBody = document.getElementById('tasks-done-body');
const chartCanvas = document.getElementById('progress-chart');
let myChart = null; // store chart instance globally


// ====== INITIALIZATION ======
loadHabits();
updateChart(); // show chart (default or based on saved habits)


// ====== EVENT LISTENERS ======
habitForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const habitName = habitNameInput.value.trim();
  if (!habitName) return;

  addHabitRow(habitName);
  habitNameInput.value = "";
  saveHabits();
  updateChart();
});

saveBtn.addEventListener('click', () => {
  updateTasksDoneTable();
  updateChart();
  saveHabits();
});


// ====== FUNCTIONS ======

function addHabitRow(habitName, status = [false, false, false, false, false, false, false]) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${habitName}</td>
    ${status.map(day => `<td><input type="checkbox" class="habit-check" ${day ? "checked" : ""}></td>`).join('')}
    <td><button class="remove-btn">Remove</button></td>
  `;

  habitList.appendChild(newRow);

  // Event listener for remove button
  newRow.querySelector('.remove-btn').addEventListener('click', () => {
    newRow.remove();
    saveHabits();
    updateChart();
    updateTasksDoneTable();
  });

  // Update when any checkbox is clicked
  newRow.querySelectorAll('.habit-check').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      saveHabits();
      updateChart();
      updateTasksDoneTable();
    });
  });
}


// ====== SAVE & LOAD ======

function saveHabits() {
  const habits = [];
  const rows = document.querySelectorAll('#habit-list tr');

  rows.forEach(row => {
    const habitName = row.querySelector('td').textContent;
    const checkboxes = row.querySelectorAll('.habit-check');
    const status = Array.from(checkboxes).map(cb => cb.checked);
    habits.push({ habitName, status });
  });

  localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
  const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
  savedHabits.forEach(habit => addHabitRow(habit.habitName, habit.status));
}


// ====== TASKS DONE TABLE ======

function updateTasksDoneTable() {
  tasksDoneBody.innerHTML = '';
  const rows = document.querySelectorAll('#habit-list tr');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  rows.forEach(row => {
    const habitName = row.querySelector('td').textContent;
    const checkboxes = row.querySelectorAll('.habit-check');
    const completedDays = days.filter((day, index) => checkboxes[index].checked);

    const doneRow = document.createElement('tr');
    doneRow.innerHTML = `
      <td>${habitName}</td>
      <td>${completedDays.length} / 7 days</td>
    `;
    tasksDoneBody.appendChild(doneRow);
  });
}


// ====== CHART FUNCTIONS ======

function updateChart() {
  const ctx = chartCanvas.getContext('2d');
  const rows = document.querySelectorAll('#habit-list tr');

  // If no habits yet — show placeholder chart
  if (rows.length === 0) {
    drawPlaceholderChart(ctx);
    return;
  }

  // Gather data
  const habitLabels = [];
  const completionData = [];

  rows.forEach(row => {
    const habitName = row.querySelector('td').textContent;
    const checkboxes = row.querySelectorAll('.habit-check');
    const completed = [...checkboxes].filter(cb => cb.checked).length;
    habitLabels.push(habitName);
    completionData.push(completed);
  });

  // Destroy previous chart if exists
  if (myChart) myChart.destroy();

  // Create new chart
  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: habitLabels,
      datasets: [{
        label: 'Completed Days',
        data: completionData,
        backgroundColor: [
          '#a3d8f4', '#ffccbc', '#c5e1a5', '#f8bbd0', '#ffe082', '#d1c4e9', '#b2dfdb'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}


function drawPlaceholderChart(ctx) {
  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Completed', 'Remaining'],
      datasets: [{
        data: [0, 7],
        backgroundColor: ['#5c67f2', '#e0e0e0']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
