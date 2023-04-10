const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'postgres', '1234', {dialect: 'postgres'});

module.exports = sequelize;
