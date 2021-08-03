const express = require('express');
const Movie = require('../models/Movie.model');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies);
        return res.status(200).json(movies);

    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router;