const express = require('express');
const db = require('./db');
const moviesRoutes = require('./routes/Movie.routes')

const PORT = 3000;
const app = express();
const router = express.Router();
db.connect();

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', router);
app.use('/movies', moviesRoutes);
// app.use('*', (req, res, next) => {
//     const err = new Error('No encontramos la ruta que solicita, disculpe');
//     return res.status(404).render(err.message)

// });

router.get('/', (req, res) => {
    const msg = 'Proyecto de NodeJS';
    res.send(msg);
})

app.listen(PORT, () => {
    console.log(`Servidor funicionando en http://localhost:${PORT}`);
});