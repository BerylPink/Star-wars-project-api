const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true
    },
    opening_crawl: {
        type: String,
        required: true
    },
    episode_id: {
        type: Number,
        required: true
    },
    release_date: {
        type: String,
        required: true 
    },
    comment_count: {
        type: Number, 
        default: 0
    }
  });
  
  module.exports = mongoose.model('Movie', movieSchema);