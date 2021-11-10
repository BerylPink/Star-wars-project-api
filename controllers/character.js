const movieControler = require('../controllers/movie'),
    axios = require('axios');

exports.getCharactersofMovie = async function (movieId) {
    try {
        
        const movieData = await movieControler.getMovieId(movieId);
        let movieCharacters = await Promise.all( movieData.characters.map(async (url) => {
            const characterData = await axios.get(url);
            return characterData.data;
        }));

        return movieCharacters;

    }catch (err) {
        Promise.reject(err);
    }
};