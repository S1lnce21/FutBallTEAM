const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Player = sequelize.define('Player', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING },
  number: { type: DataTypes.INTEGER },
});

module.exports = Player;