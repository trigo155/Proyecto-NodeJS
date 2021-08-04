const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const ValidatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
}

const registerStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async(req, email, password, done) => {
        try {
            const existIngUser = await User.findOne({ email });

            if (existIngUser) {
                const error = new Error('Usuario registrado');
                return done(error);
            };

            const isValidEmail = validateEmail(email);

            if (!isValidEmail) {
                const error = new Error('El email es incorrecto. No cumple formato email');
                return done(error);
            };

            const isValidPassword = ValidatePass(password);

            if (!isValidPassword) {
                const error = new Error('Contraseña entre 6 y 20 caracteres, minúscula, mayúscula y un número');
            }

            const saltRounds = 9;
            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email,
                password: hash,
                name: req.body.name,
            });

            const savedUser = await newUser.save();

            savedUser.password = undefined;
            return done(null, savedUser);

        } catch (err) {
            return done(err);
        }
    });

module.exports = registerStrategy;