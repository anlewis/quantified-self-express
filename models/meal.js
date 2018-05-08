const { STRING } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define('Meal', {
    name: STRING
  });
  Meal.associate = function(models) {
    // associations can be defined here
  };
  return Meal;
};