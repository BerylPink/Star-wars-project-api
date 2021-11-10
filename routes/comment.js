const express = require('express');

const mongoose = require('mongoose')

const router = express.Router();

const Movie = require('../models/movie');

const Comment = require("../models/comment");

const env = require('dotenv').config();

var stringify = require('json-stringify-safe');

const _ = require('lodash');

const axios = require('axios');



router.post("/addComment", (req, res) => {
    try {     
        Movie.findById(movieId).select('title opening_crawl episode_id release_date comment_count').exec().then(obj => {
            if(obj.length > 0){ 
                let check = false;
                for (let i = 0; i < obj.length; i++){
                    if (obj[i].episode_id === req.body.commentory_id) {
                        check = true;
                        break;
                    }
                }

                if (check !== true){
                    return  res.status(400).json({
                        message: 'Movie ID is not valid',
                        data: null
                    });
        
                }
                let comm = new Comment({
                    _id:  mongoose.Types.ObjectId(),
                    comment: req.body.comment, 
                    commentory_id: req.body.commentory_id,
                    commentory_type: req.body.commentory_type,
                    ip_address: req.header('x-forwarded-for') || req.connection.remoteAddress,
                    date: new Date(Date.now()).toISOString().replace(/:/g, '-')
                });

                Comment.collection.insert(comm);
                let Allow = Movie.findOne({episode_id: comm.commentory_id}).exec();
                Allow.then(doc =>{
                    Movie.collection.update({"episode_id" : comm.commentory_id },{$set : {"comment_count": doc.comment_count + 1 }})
                }).catch(err => {
                    return res.json({ err })
                })
                return  res.json({
                    message: 'comment created successfully',
                    data: null
                });
    
            }
            else {
                return  res.json({
                    message: 'movie not found',
                    data: null
                });
            }
        })
    }
    catch (err) {
      console.log(err)
      return res.json({ err })
    }
   
});


router.get('/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    Movie.findOne({episode_id: movieId}).exec().then(idy => {
        if (!idy) {
            return res.status(400).json({
                message: 'Movie ID  does not exist',
                data: null
            });
        }
        else {
            Comment.find({commentory_id: idy.episode_id}).exec().then(doccumen =>{ 
                if (doccumen.length !== 0) {
                    return  res.status(200).json({
                        message: 'Comment retrieved for Movie ' + movieId,
                        ip_address: doccumen.ip_address,
                        data: _.sortBy(doccumen, 'release_date'),
                    });
                }
                else {
                    return  res.status(400).json({
                        message: 'No comment found for this movie now, you can create one',
                        data: null
                    }); 
                }
            })
        }
       
    });

});

module.exports = router