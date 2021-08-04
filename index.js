const express = require('express');
const path = require('path');
const passport = require('passport');
const db = require('./db');
const moviesRoutes = require('./routes/Movie.routes');

const app = express();
const PORT = 3000;
const router = express.Router();
db.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/movies', moviesRoutes);
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