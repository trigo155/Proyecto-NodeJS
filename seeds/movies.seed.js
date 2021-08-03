const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');
const db = require('../db');

const movies = [{
    title: 'Con la muerte en los talones',
    year: 1959,
    director: 'Alfred Hitchcock',
    actors: 'Cary Grant, Eva Marie Saint, James Mason, Martin Landau',
    country: 'United States, California',
    duration: '2h 16m',
    summary: 'Roger O.Thornhill es confundido por George Kaplan, un agente del gobierno. Consigue escapar aunque lo siguen de cerca',
    filmProducer: '',
    gender: 'Suspense',
}];

mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {
        const allMovies = await Movie.find();

        if (allMovies.length) {
            await Movie.collection.drop();
            console.log('Colección eliminada correctamente, evitando los duplicados');
        } else {
            console.log('No se encuentan películas');
        }
    })
    .catch(err => console.log('Error al eliminar la colección', err))
    .then(async() => {
        await Movie.insertMany(movies);
        console.log('Películas añadidas con éxito');
    })
    .catch(err => console.log('Error al añadir películas', err))
    .finally(() => mongoose.disconnect());