const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {
        type: String,
        required: true
    },
    commentory_id: {
        type: Number,
        required: true
    },
    commentory_type: {
        type: String,
        required: true
    },
    ip_address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);