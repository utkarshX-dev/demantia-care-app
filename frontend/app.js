fetch('http://localhost:5000/reminders/all')
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));
