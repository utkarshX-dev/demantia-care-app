const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (images, CSS, JS) from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set path for EJS views
app.set('views', path.join(__dirname, 'views'));

// Session middleware to keep track of user sessions
app.use(expressSession({
    secret: 'your-secret-key',  // Use a secure secret key
    resave: false,
    saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dementia-care-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Create User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Middleware to check if user is logged in
function checkAuthentication(req, res, next) {
    if (!req.session.user) {  // Check if user is logged in
        res.redirect('/login');  // Redirect to login if not authenticated
    } else {
        next();  // Allow access to the requested page if authenticated
    }
}

// Route: Home Page
app.get('/', (req, res) => {
    const user = req.session.user || null; // Get user from session if logged in
    res.render('index', { user });  // Pass user to the view
});

// Route: About Page (authentication required)
app.get('/about', checkAuthentication, (req, res) => {
    const user = req.session.user || null; // Get user from session if logged in
    res.render('about', { user });  // Pass user to the view
});

// Routes for Login and Signup
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});
// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');  // Clear the session cookie
        res.redirect('/');  // Redirect to home after logout
    });
});

// Handle Login Form Submission
app.post('/login', async (req, res) => {
    const { email, password, remember } = req.body;
    console.log(`Login attempt: ${email}, ${password}, Remember me: ${remember}`);

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.send('User not found');
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.send('Invalid password');
    }

    req.session.user = { email: user.email, name: user.name }; // Store user info in session

    if (remember) {
        // If Remember Me is checked, set a long session duration (e.g., 30 days)
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    } else {
        // Otherwise, use the default session expiration (usually browser session)
        req.session.cookie.maxAge = null;
    }

    res.redirect('/');  // Redirect to home after successful login
});
// Profile Route
app.get('/profile', checkAuthentication, (req, res) => {
    const user = req.session.user;
    res.render('profile', { user });  // Render profile page with user data
});


// Handle Signup Form Submission
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Signup attempt: ${name}, ${email}, ${password}`);

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.send('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.redirect('/login');  // Redirect to login page after successful signup
});

// Start Server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
