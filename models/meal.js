const { STRING } = require('sequelize');
const models = require('./index')

module.exports = sequelize => {
  var Meal = sequelize.define('Meal', {
    name: STRING
  });
  Meal.associate = function(models) {
    // models.Meal.belongsToMany(models.Food, { through: models.FoodMeals })
  };
  return Meal;
};