const movieControler = require('../controllers/movie');
const axios = require('axios');

exports.getCharactersofMovie = async function (movieId) {
    try {
        const movieData = await movieControler.getMovie(movieId);
        let movieCharacters = await Promise.all( movieData.characters.map(async (url) => {
            const characterData = await axios.get(url);
            return characterData.data;
        }));

        return movieCharacters;

    }catch (e) {
        Promise.reject(e);
    }
};