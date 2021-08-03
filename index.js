const express = require('express');
const db = require('./db');

const PORT = 3000;
const app = express();
const router = express.Router();

app.use('/', router);
db.connect();

app.listen(PORT, () => {
    console.log(`Servidor funicionando en http://localhost:${PORT}`);
});

router.get('/', (req, res) => {
    const msg = 'Proyecto de NodeJS';
    res.send(msg);
})