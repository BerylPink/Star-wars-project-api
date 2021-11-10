const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Movie = require('../models/movie');

const env = require('dotenv').config();

var stringify = require('json-stringify-safe');

const _ = require('lodash');

const axios = require('axios');


router.get("/get-movies", async (req, res) => {
    try {
        const api_url = `${process.env.SWAPI_URL}/films`;
        const response_api = await axios.get(api_url);
        const rep = JSON.parse(stringify(response_api));
        const sort = _.sortBy(rep.data['results'], 'release_date');

        Movie.find().select('title opening_crawl episode_id release_date comment_count').exec().then(obj => {
            if (obj.length > 0) {
                const retrieved = {
                    count: obj.length,
                    movieArray: obj.filter(ob => {
                        return {
                            title: ob.title,
                            opening_crawl: ob.opening_crawl,
                            episode_id: ob.episode_id,
                            release_date: ob.release_date,
                            comment_count: ob.comment_count
                        }
                    })
                }
                res.json({
                    status: 200,
                    message: "Movie retrieved",
                    data: retrieved 
                })

            }
            else {  
                var movie = Movie.collection.insertOne(sort); 
                res.json({
                    status: 200,
                    message: "Movie retrieved",
                    data: sort
                })
            }
        });
      
    }
    catch (err) {
       console.log(err)
       return res.json({ err })
    }
    
});
 
 module.exports = router