'use strict';
module.exports = (sequelize, DataTypes) => {
    var Meal = sequelize.define('Meal', {
        name: DataTypes.STRING
    });

    Meal.associate = function (models) {
        Meal.belongsToMany(models.Food, {
            through: models.FoodMeals,
            as: 'foods',
            foreignKey: 'foodId'
        })
    };

    return Meal;
}
;