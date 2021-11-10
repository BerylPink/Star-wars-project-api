const express = require('express');

const characterController = require('../controllers/character');

const router = express.Router();

const _ = require('lodash');

const Movie = require('../models/movie');

const axios = require('axios');

router.get('/:movieId', async(req, res) => {
    const movieId = req.params.movieId;
    let characters = await characterController.getCharactersofMovie(req.params.movieId);
    if(characters.length !== 0){

        if ('sortBy' in req.query) {

            if (req.query.sortBy !== 'name' && req.query.sortBy !== 'gender' && req.query.sortBy !== 'height') {

                return res.status(400).json({
                    'message': 'You can only sort character by name or gender or height'
                });

            }
            const sort = _.sortBy(characters, ['name','gender','height']);
      
            if ('order' in req.query){

                if (req.query.order !== 'asc' && req.query.order !== 'desc') {
                    return res.status(400).json({
                        'message': 'Ordering must be in asc or desc order'
                    });
                }
                if (req.query.order === 'asc' || req.query.order === 'desc'){
                    orderBy = _.orderBy(sort, ['created'], [req.query.order]);
                }

            }

            if ('gender' in req.query){
            
                if (req.query.gender !== 'male' && req.query.gender !== 'female'){
                return  res.status(400).json({
                        'message': 'The parameter Gender must be male or female'
                    });
                }
                if (req.query.gender === 'male'){
                    orderByGenderMale = _.filter(orderBy, ['gender', req.query.gender])
                    return res.json({
                        status: 200,
                        message: 'Successfully retrieved data for' + movieId,
                        data: orderByGenderMale
                    })
                }
                else {
                    orderByGenderFemale =  _.filter(orderBy, ['gender', req.query.gender])
                    return res.json({
                        status: 200,
                        message: 'Successfully retrieved data for ' + movieId,
                        data: orderByGenderFemale
                    })
                }
            }

        }
    
    }
    else {
        return res.json({
            status: 500,
            message: 'No character retrieved ' + movieId 
        })
    }
     
});

module.exports = router;