const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)  // Mongo URI from environment variable
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Game Routes (Import only once)
const gameRoutes = require('./routes/gameRoutes');
app.use('/games', gameRoutes);  // Use game routes under '/games' path

// Reminder Routes (Placeholder for future routes)
const reminderRoutes = require('./routes/reminderRoutes');
app.use('/reminders', reminderRoutes);

// Root Route
=======
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

>>>>>>> 5f7de5a9f42fae8306d5f0aece29334b0ee74eab
app.get('/', (req, res) => {
    res.send('Dementia Care Backend Working!');
});

<<<<<<< HEAD
// Server Setup
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
=======
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
const reminderRoutes = require('./routes/reminderRoutes');
app.use('/reminders', reminderRoutes);
>>>>>>> 5f7de5a9f42fae8306d5f0aece29334b0ee74eab
