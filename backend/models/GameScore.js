const express = require('express');
const router = express.Router();
const Score = require('../models/Score');  // Import the Score model

// Route to serve Memory Card Matching game page
router.get('/memory-card-matching', (req, res) => {
    res.render('memory-card-matching', {
        cards: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'] // Example cards
    });
});

// Route to serve Simon Says game page
router.get('/simon-says', (req, res) => {
    res.render('simon-says');
});

// Route to serve Brain Teasers game page
router.get('/brain-teasers', (req, res) => {
    res.render('brain-teasers', {
        questions: [
            { question: 'What has keys but can’t open locks?', answer: 'Piano' },
            { question: 'What comes once in a minute, twice in a moment, but never in a thousand years?', answer: 'The letter "M"' }
        ]
    });
});

// Route to serve Word Search game page
router.get('/word-search', (req, res) => {
    res.render('word-search', {
        grid: [
            'P', 'I', 'A', 'N', 'O',
            'G', 'O', 'L', 'F', 'D',
            'M', 'A', 'T', 'H', 'S'
        ]
    });
});

// Route to save the score
router.post('/save-score', async (req, res) => {
    const { userId, gameName, score } = req.body;

    // Validate that all fields are provided
    if (!userId || !gameName || !score) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new Score document
    const newScore = new Score({
        userId,
        gameName,
        score,
    });

    try {
        // Save the score to the database
        await newScore.save();
        res.status(200).json({ message: 'Score saved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving score' });
    }
});

module.exports = router;
