const { INTEGER } = require('sequelize');

module.exports = sequelize => {
  var FoodMeals = sequelize.define('FoodMeals', {
    foodId: INTEGER,
    mealId: INTEGER
  });
  FoodMeals.associate = function(models) {
    // associations can be defined here
  };
  return FoodMeals;
};