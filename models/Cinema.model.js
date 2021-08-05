const moongose = require('moongose');

const { Schema } = mongoose;

const CinemaSchema = new Schema({
    name: { type: String, required: true },
    ubication: { type: String, required: true },
    capacity: { type: String, required: true },
    duration: { type: Number },

}, { timestamps: true });

const Cinema = moongose.model('Cinemas', CinemaSchema);

module.exports = Cinema;