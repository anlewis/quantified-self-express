'use strict';
module.exports = (sequelize, DataTypes) => {
    var Food = sequelize.define('Food', {
        name: DataTypes.STRING,
        calories: DataTypes.INTEGER
    });

    Food.associate = function (models) {
        Food.belongsToMany(models.Meal, {
            through: models.FoodMeals,
            as: 'meals',
            foreignKey: 'mealId'
        })
    };

    return Food;
};