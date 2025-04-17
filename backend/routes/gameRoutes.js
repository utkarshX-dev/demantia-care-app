// gameRoutes.js
const express = require('express');
const router = express.Router();

// Route to serve Memory Card Matching game page
router.get('/memory-card-matching', (req, res) => {
    res.send('Memory Card Matching Game');  // Temporary text until you create the EJS file
});

// Route to serve Simon Says game page
router.get('/simon-says', (req, res) => {
    res.send('Simon Says Game');  // Temporary text until you create the EJS file
});

router.post('/save-score', (req, res) => {
    const { userId, gameName, score } = req.body;

    // Save the score logic goes here (you already have the code for that)
});


module.exports = router;
