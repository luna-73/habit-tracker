// Get references to the form, habit list, and input field
const habitForm = document.getElementById('habit-form');
const habitNameInput = document.getElementById('habit-name');
const habitList = document.getElementById('habit-list');

// Load the saved habits from localStorage (if any)
loadHabits();

// Event listener for form submission
habitForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    
    const habitName = habitNameInput.value.trim(); // Get the habit name from input
    
    if (habitName !== "") {
        // Create a new row in the table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${habitName}</td>
            <td><input type="checkbox" class="habit-check"></td>
            <td><input type="checkbox" class="habit-check"></td>
            <td><input type="checkbox" class="habit-check"></td>
            <td><input type="checkbox" class="habit-check"></td>
            <td><input type="checkbox" class="habit-check"></td>
            <td><input type="checkbox" class="habit-check"></td>
            <td><input type="checkbox" class="habit-check"></td>
            <td><button class="remove-btn">Remove</button></td>
        `;
        
        // Append the new row to the habit list
        habitList.appendChild(newRow);
        
        // Clear the input field after adding habit
        habitNameInput.value = "";
        
        // Add event listener to remove button
        newRow.querySelector('.remove-btn').addEventListener('click', function() {
            newRow.remove(); // Remove the habit row from the table
            saveHabits(); // Save updated habits after removal
        });

        // Save habits to localStorage
        saveHabits();
    }
});

// Save the habit list and checkbox statuses to localStorage
function saveHabits() {
    const habits = [];
    const rows = document.querySelectorAll('#habit-list tr');
    
    rows.forEach(row => {
        const habitName = row.querySelector('td').textContent;
        const checkboxes = row.querySelectorAll('.habit-check');
        const status = Array.from(checkboxes).map(checkbox => checkbox.checked);
        
        habits.push({ habitName, status });
    });

    // Store the habit list in localStorage
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Load the saved habit list and checkbox statuses from localStorage
function loadHabits() {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
        const habits = JSON.parse(savedHabits);
        
        habits.forEach(habit => {
            // Create a new row for each saved habit
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${habit.habitName}</td>
                <td><input type="checkbox" class="habit-check"></td>
                <td><input type="checkbox" class="habit-check"></td>
                <td><input type="checkbox" class="habit-check"></td>
                <td><input type="checkbox" class="habit-check"></td>
                <td><input type="checkbox" class="habit-check"></td>
                <td><input type="checkbox" class="habit-check"></td>
                <td><input type="checkbox" class="habit-check"></td>
                <td><button class="remove-btn">Remove</button></td>
            `;
            
            // Set checkbox states based on saved status
            const checkboxes = newRow.querySelectorAll('.habit-check');
            checkboxes.forEach((checkbox, index) => {
                checkbox.checked = habit.status[index];
            });

            // Append the new row to the habit list
            habitList.appendChild(newRow);

            // Add event listener to remove button
            newRow.querySelector('.remove-btn').addEventListener('click', function() {
                newRow.remove(); // Remove the habit row from the table
                saveHabits(); // Save updated habits after removal
            });
            // Button and done table
const saveBtn = document.getElementById('save-progress-btn');
const tasksDoneBody = document.getElementById('tasks-done-body');

saveBtn.addEventListener('click', function () {
    // Clear the previous "tasks done" entries
    tasksDoneBody.innerHTML = '';

    const rows = document.querySelectorAll('#habit-list tr');

    rows.forEach(row => {
        const habitName = row.querySelector('td').textContent;
        const checkboxes = row.querySelectorAll('.habit-check');

        let completedDays = [];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                completedDays.push(days[index]);
            }
        });

        const doneRow = document.createElement('tr');
        doneRow.innerHTML = `
        <td>${habitName}</td>
        <td>${completedDays.length} / 7 days</td>
     `;


        tasksDoneBody.appendChild(doneRow);
    });
        // Generate Pie Chart
        const ctx = document.getElementById('progress-chart').getContext('2d');
        const habitLabels = [];
        const completionData = [];
    
        rows.forEach(row => {
            const habitName = row.querySelector('td').textContent;
            const checkboxes = row.querySelectorAll('.habit-check');
            const completed = [...checkboxes].filter(cb => cb.checked).length;
    
            habitLabels.push(habitName);
            completionData.push(completed);
        });
    
        if (window.myChart) {
            window.myChart.destroy(); // Clear previous chart
        }
    
        window.myChart = new Chart(ctx, {
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
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    

    // Also update localStorage again to make sure it’s saved
    saveHabits();
});

        });
    }
}
