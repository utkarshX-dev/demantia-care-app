const express = require('express');
const router = express.Router();

// Import the GameScore model
const GameScore = require('../models/GameScore');

// Route to serve Memory Card Matching game page
router.get('/memory-card-matching', (req, res) => {
    res.render('memory-card-matching'); // This will render memory-card-matching.ejs file
});

// Route to serve Simon Says game page
router.get('/simon-says', (req, res) => {
    res.render('simon-says'); // This will render simon-says.ejs file
});

router.post('/save-score', (req, res) => {
    const { userId, gameName, score } = req.body;

    const newScore = new GameScore({
        userId,
        gameName,
        score
    });

    newScore.save()
        .then(savedScore => {
            res.json(savedScore);
        })
        .catch(err => {
            console.error('Error saving score:', err);
            res.status(500).send('Error saving score');
        });
});

// Route to get leaderboard (top scores)
router.get('/leaderboard', (req, res) => {
    GameScore.find()
        .sort({ score: -1 })  // Sort by score in descending order
        .limit(10)  // Limit to top 10 scores
        .then(scores => {
            res.json(scores);
        })
        .catch(err => {
            console.error('Error fetching leaderboard:', err);
            res.status(500).send('Error fetching leaderboard');
        });
});

module.exports = router;
