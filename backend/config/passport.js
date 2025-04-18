const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Import the User model

// Local Strategy for email and password authentication
passport.use(new LocalStrategy({
    usernameField: 'email',  // Use 'email' instead of default 'username'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'No user found with that email' });
        }

        // Check if the password is correct using your model method
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid password' });
        }

        return done(null, user);  // Success
    } catch (err) {
        return done(err);
    }
}));

// Serialize the user ID into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from the ID stored in the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
