const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ip_address: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    commentory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
    },
    commentory_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
    },
    comment_field: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    }

});

module.exports = Comment;