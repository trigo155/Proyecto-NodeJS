const express = require('express');
const db = require('./db');
const moviesRoutes = require('./routes/Movie.routes')

const PORT = 3000;
const app = express();
const router = express.Router();
db.connect();

app.use('/', router);
app.use('/movies', moviesRoutes)

router.get('/', (req, res) => {
    const msg = 'Proyecto de NodeJS';
    res.send(msg);
})

app.listen(PORT, () => {
    console.log(`Servidor funicionando en http://localhost:${PORT}`);
});