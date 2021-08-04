const express = require('express');
const passport = require('passport');

const router = express.Router();



router.get('/register', (req, res, next) => {
    return res.render('./auth/register');
});



router.post('/register', async(req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }
        req.login(user, (error) => {
            if (error) {
                return next(error);
            };
            console.log('Usuario registrado: ', user.id);
            return res.redirect('/movies');
        });
    };

    passport.authenticate('registro', done)(req);
});



router.get('/login', (req, res, next) => {
    return res.render('./auth/login');
});



router.post('/login', (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.login(user, (error) => {
            if (error) {
                return next(error);
            };
            console.log('Usuario registrado: ', user);
            return res.redirect('/nose');
        });
    };
    passport.authenticate('acceso', done)(req);
});



router.post('/logout', (req, res, next) => {
    if (req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.redirect('/');
        });
    }
});

module.exports = router;