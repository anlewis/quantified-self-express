var fakerFoods = require('../public/javascripts/fakerFoods')
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var foods = []
    for (var i = 0; i < 50; i++) {
      var randomIndex = Math.floor(Math.random() * fakerFoods.length)
      var randomName = fakerFoods[randomIndex];
      var randomCalories = Math.floor(Math.random() * 2000);
      foods.push({
        name: randomName,
        calories: randomCalories,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return queryInterface.bulkInsert('Food', foods)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
