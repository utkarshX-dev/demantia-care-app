const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// Set EJS as the view engine (for rendering views)
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

// Reminder Routes
const reminderRoutes = require('./routes/reminderRoutes');
app.use('/reminders', reminderRoutes);  // Use reminder routes under '/reminders' path

// Root Route (Test Route)
app.get('/', (req, res) => {
    res.send('Dementia Care Backend Working!');
});

// Server Setup
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
