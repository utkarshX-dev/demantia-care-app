const express = require('express');
const router = express.Router();

// Helper function to generate a random letter
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
}

// Helper function to generate a word search grid
function generateGrid() {
    const size = 10; // Grid size (10x10)
    let grid = Array(size).fill().map(() => Array(size).fill(''));

    const words = ['WORD', 'SEARCH', 'GAME', 'EXAMPLE'];

    // Place words in the grid
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);
            if (canPlaceWord(word, row, col, direction, grid)) {
                placeWord(word, row, col, direction, grid);
                placed = true;
            }
        }
    });

    // Fill the empty spaces with random letters
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (!grid[row][col]) {
                grid[row][col] = getRandomLetter();
            }
        }
    }

    return grid;
}

// Helper function to check if a word can be placed at a given position
function canPlaceWord(word, row, col, direction, grid) {
    if (direction === 0) { // Horizontal
        if (col + word.length > grid[row].length) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
                return false;
            }
        }
    } else { // Vertical
        if (row + word.length > grid.length) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
                return false;
            }
        }
    }
    return true;
}

// Helper function to place a word in the grid
function placeWord(word, row, col, direction, grid) {
    if (direction === 0) { // Horizontal
        for (let i = 0; i < word.length; i++) {
            grid[row][col + i] = word[i];
        }
    } else { // Vertical
        for (let i = 0; i < word.length; i++) {
            grid[row + i][col] = word[i];
        }
    }
}

// Memory Card Matching Route
router.get('/memory-card-matching', (req, res) => {
    res.render('memory-card-matching');
});

// Word Search Route (Updated with grid generation logic)
router.get('/word-search', (req, res) => {
    const grid = generateGrid(); // Generate the word search grid
    res.render('word-search', { grid }); // Pass the grid to the view
});

// Brain Teasers Route
router.get('/brain-teasers', (req, res) => {
    res.render('brain-teasers');
});

// Simon Says Route
router.get('/simon-says', (req, res) => {
    res.render('simon-says');
});

module.exports = router;
