const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect('mongodb://localhost:27017/dementia-care-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', userSchema);

function checkAuthentication(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    const user = req.session.user || null;
    res.render('index', { user });
});

app.get('/about', checkAuthentication, (req, res) => {
    const user = req.session.user || null;
    res.render('about', { user });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.post('/login', async (req, res) => {
    const { email, password, remember } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.send('Invalid password');
    }

    req.session.user = { email: user.email, name: user.name };

    if (remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.maxAge = null;
    }

    res.redirect('/');
});

app.get('/profile', checkAuthentication, (req, res) => {
    const user = req.session.user;
    res.render('profile', { user });
});

app.get('/contact', checkAuthentication, (req, res) => {
    const user = req.session.user;
    res.render('contact', { user });
});

app.get('/services', checkAuthentication, (req, res) => {
    const user = req.session.user;
    res.render('services', { user });
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.send('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.redirect('/login');
});

app.use((req, res, next) => {
    res.status(404).render('error', {
        message: 'Sorry, we couldn\'t find the page you were looking for.'
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
