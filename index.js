const express = require('express');
const path = require('path');
const passport = require('passport');
const db = require('./db');
const moviesRoutes = require('./routes/Movie.routes');
const authRoutes = require('./routes/Auth.routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const auth = require('./auth');
auth.setStrategies();

const app = express();
const PORT = 3000;
const router = express.Router();
db.connect();

app.use(session({
    secret: 'A,klñdsf23$·#fdsa1515',
    desave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL })
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use('/', router);
app.use('/movies', moviesRoutes);
app.use('/auth', authRoutes);
// app.use('*', (req, res, next) => {
//     const err = new Error('No encontramos la ruta que solicita, disculpe');
//     return res.status(404).render(err.message)

// });

router.get('/', (req, res) => {
    const msg = 'Proyecto de NodeJS';
    res.render('index', { msg });
})

app.listen(PORT, () => {
    console.log(`Servidor funicionando en http://localhost:${PORT}`);
});