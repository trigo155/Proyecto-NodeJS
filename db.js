const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/old-movies';

const connect = async() => {

    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('Conectado a la DB');
    } catch (err) {
        console.log(`Error al conectatar a la base de datos ${err}`);
    }

}

module.exports = { DB_URL, connect };