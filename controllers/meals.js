const Meal = require('../models/meal')
const sequelize = require('../sequelize')

const attrs = ['id', 'name']

getMeals = function (req, res) {
  Meal(sequelize).findAll({ attributes: attrs })
    .then(meals => {
      res.json(meals)
    })
    .catch((e) => { console.log("WHAT WHY HOW") })
}

module.exports = getMeals