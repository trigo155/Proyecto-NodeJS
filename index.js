const express = require('express');

const PORT = 3000;
const app = express();
const router = express.Router();

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor funicionando en http://localhost:${PORT}`);
});

router.get('/', (req, res) => {
    res.send('Arrancado el servidor')
})