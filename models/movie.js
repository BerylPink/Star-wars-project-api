const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Movie = sequelize.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    opening_crawl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    episode_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    release_date: {
        type: Sequelize.DATE,
        allowNull: false  
    },
    comment_count: {
        type: Number, 
        default: 0
    }
});

module.exports = Movie;