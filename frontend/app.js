<<<<<<< HEAD
fetch('http://localhost:5000/reminders/all')
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));
=======
document.addEventListener('DOMContentLoaded', () => {
    // Fetch reminders from backend API and display them
    function fetchReminders() {
        fetch('/api/reminders')
            .then(response => response.json())
            .then(data => {
                const reminderList = document.getElementById('reminder-list');
                reminderList.innerHTML = ''; // Clear existing list
                if (data.length === 0) {
                    reminderList.innerHTML = '<li class="list-group-item">No reminders found.</li>';
                } else {
                    data.forEach(reminder => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item';
                        li.innerHTML = `
                            ${reminder.medicineName} - Take at ${reminder.time}
                            <button class="btn btn-sm btn-danger float-right delete-reminder" data-id="${reminder.id}">Delete</button>
                        `;
                        reminderList.appendChild(li);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching reminders:', error);
                document.getElementById('reminder-list').innerHTML = '<li class="list-group-item">Failed to load reminders.</li>';
            });
    }

    // Fetch appointments from backend API and display them
    function fetchAppointments() {
        fetch('/api/appointments')
            .then(response => response.json())
            .then(data => {
                const appointmentList = document.getElementById('appointment-list');
                appointmentList.innerHTML = ''; // Clear existing list
                if (data.length === 0) {
                    appointmentList.innerHTML = '<li class="list-group-item">No appointments scheduled.</li>';
                } else {
                    data.forEach(appointment => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item';
                        li.innerHTML = `
                            ${appointment.date} - ${appointment.description}
                            <button class="btn btn-sm btn-danger float-right delete-appointment" data-id="${appointment.id}">Delete</button>
                        `;
                        appointmentList.appendChild(li);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
                document.getElementById('appointment-list').innerHTML = '<li class="list-group-item">Failed to load appointments.</li>';
            });
    }

    // Delete reminder
    document.getElementById('reminders').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-reminder')) {
            const id = event.target.dataset.id;
            fetch(`/api/reminders/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    fetchReminders(); // Refresh reminders
                } else {
                    console.error('Error deleting reminder');
                    alert('Failed to delete reminder.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete reminder.');
            });
        }
    });

    // Delete appointment
    document.getElementById('appointments').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-appointment')) {
            const id = event.target.dataset.id;
            fetch(`/api/appointments/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    fetchAppointments(); // Refresh appointments
                } else {
                    console.error('Error deleting appointment');
                    alert('Failed to delete appointment.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete appointment.');
            });
        }
    });

    // Open game in new tab
    document.querySelectorAll('.game-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const gameUrl = this.getAttribute('data-game-url');
            window.open(gameUrl, '_blank');
        });
    });

    // Initial fetch
    fetchReminders();
    fetchAppointments();
});
>>>>>>> 5f7de5a9f42fae8306d5f0aece29334b0ee74eab
