const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();
require('./config/passport');  // Ensure this file only handles local strategy now
const User = require('./models/User');  // Import the User model

// Import game routes
const gameRoutes = require('./routes/gameRoutes');  // Import the gameroutes

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration for passport
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Global user injection for EJS templates
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Authentication middleware
function checkAuthentication(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// Routes

// Home Page
app.get('/', (req, res) => {
    res.render('index');
});

// About Page
app.get('/about', checkAuthentication, (req, res) => {
    res.render('about');
});

// Services Page
app.get('/services', (req, res) => {
    res.render('services');  // Assuming you have a 'services.ejs' in your 'views' folder
});

// Contact Page
app.get('/contact', (req, res) => {
    res.render('contact');  // Assuming you have a 'contact.ejs' in your 'views' folder
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login');
});

// Signup Page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.redirect('/');
        res.redirect('/');
    });
});

// Login POST route
app.post('/login', async (req, res, next) => {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.send('User not found');
    }

    // Use bcrypt to compare the password directly
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send('Invalid password');
    }

    req.login(user, (err) => {
        if (err) return next(err);

        // Session handling for "remember me"
        if (remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;  // 30 days
        } else {
            req.session.cookie.expires = false;
        }

        res.redirect('/profile');
    });
});

// Signup POST route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.send('User with this email already exists');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    res.redirect('/login');
});

// Profile page (only accessible if logged in)
app.get('/profile', checkAuthentication, (req, res) => {
    res.render('profile');
});

// Use the game routes for handling game-related pages
app.use('/games', gameRoutes);  // Add this line to handle routes from 'gameroutes.js'

// 404 Error handling
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: 'Sorry, we couldn\'t find the page you were looking for.'
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
