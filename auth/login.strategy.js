const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

const loginStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async(req, email, password, done) => {
        try {
            const existIngUser = await User.findOne({ email });

            if (!existIngUser) {
                const error = new Error('El usuario no existe');
                error.status = 401;
                return done(error);
            }

            const isValidPassword = await bcrypt.compare(password, existIngUser.password);

            if (!isValidPassword) {
                const error = new Error('Revisa lo que has tecleado, la contraseña no es válida');
                return done(error);
            };

            existIngUser.password = undefined; // Very important to security
            return done(null, existIngUser)
        } catch (err) {
            return done(err);
        }
    }
);

module.exports = loginStrategy;