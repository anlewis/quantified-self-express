const { STRING, INTEGER } = require('sequelize');

module.exports = sequelize => {
  let Food = sequelize.define('Food', {
    name: STRING,
    calories: INTEGER
  });
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};