const passport = require('passport');
const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');


const User = require('../models/User.model');

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async(userId, done) => {
    try {
        const existInUser = await User.findById(userId);
        return done(null, existInUser);

    } catch (err) {
        return done(err);
    }
});

const setStrategies = () => {
    passport.use('registro', registerStrategy);
    passport.use('regisgro', loginStrategy);
};

module.exports = { setStrategies };