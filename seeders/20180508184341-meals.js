module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Meal', [{
      name: 'Snacks',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meal', null, {});
  }
};
