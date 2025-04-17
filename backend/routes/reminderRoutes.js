// routes/reminderRoutes.js
const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
router.post('/add', async (req, res) => {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.send('Reminder Saved');
});

router.get('/all', async (req, res) => {
    const reminders = await Reminder.find();
    res.json(reminders);
});

module.exports = router;
