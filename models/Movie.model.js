const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
        title: { type: String, required: true },
        year: { type: Number, required: true },
        director: { type: String, required: true },
        actors: { type: String, required: true },
        country: { type: String },
        duration: { type: String },
        summary: { type: String },
        filmProducer: { type: String },
        gender: {
            type: String,
            required: true,
            enum: ['Comedy', 'Drama', 'Action', 'Animation', 'Musical', 'Romance', 'Terror', 'Sci-fi', 'Suspense'],

        },

    }, { timestamps: true }

);

const Movie = mongoose.model('Movies', MovieSchema);

module.exports = Movie;