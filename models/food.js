// const { STRING, INTEGER } = require('sequelize');

// module.exports = sequelize => {
//   var Food = sequelize.define('Food', {
//     name: STRING,
//     calories: INTEGER
//   });
//   Food.associate = function(models) {
//     // Food.belongsToMany(Meal, { through: FoodMeals })
//   };
//   return Food;
// };


'use strict';
module.exports = (sequelize, DataTypes) => {
  var Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  });

  Food.associate = function (models) {
    // Food.belongsToMany(Meal, { through: FoodMeals })
  };

  return Food;
};