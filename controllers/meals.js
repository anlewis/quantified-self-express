const models = require('../models')

const attrs = ['id', 'name']

getMeals = function (req, res) {
  models.Meal.findAll({ attributes: attrs })
    .then(meals => {
      res.json(meals)
    })
    .catch((e) => { console.log("WHAT WHY HOW") })
}

module.exports = getMeals