const passport = require('passport');
const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');


const User = require('../models/User.model');

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async(userId, done) => {
    try {
        const existIngUser = await User.findById(userId);
        return done(null, existIngUser);

    } catch (err) {
        return done(err);
    }
});

const setStrategies = () => {
    passport.use('registro', registerStrategy);
    passport.use('acceso', loginStrategy);
};

module.exports = { setStrategies };