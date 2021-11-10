const Sequelize = require('sequelize');

const sequelize = new Sequelize('star-wars', 'root', 'Timiadiel.123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
