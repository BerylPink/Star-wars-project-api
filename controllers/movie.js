const axios = require('axios');
const _ = require('lodash');
const env = require('dotenv').config();
var stringify = require('json-stringify-safe');


exports.getMovies = async function () {
    try {
        const api_url = `${process.env.SWAPI_URL}/films`
        const response_api = await axios.get(api_url);
        const rep = JSON.parse(stringify(response_api))
        const movieBy = _.sortBy(rep.data['results'], 'release_date');
        return movieBy;

    } catch (err) {
        return  Promise.reject(err);
    }

};
exports.getMovie = async (movieId) => {
    try {
        const response = await axios.get(`${process.env.SWAPI_URL}/films/${movieId}`);
        return response.data;

    }catch (err) {
        return Promise.reject(err);
    }
};