const models = require('../models')

const attrs = ['id', 'name']
const foodAttrs = ['id', 'name', 'calories']

getMeals = function (req, res) {
  models.Meal.findAll(
    {
      attributes: attrs,
      include: [{
        model: models.Food,
        as: 'foods',
        attributes: foodAttrs,
        through: { attributes: [] } 
      }],
    })
    .then(meals => {
      res.json(meals)
    })
    .catch((e) => { throw e })
}

getMeal = function (req, res) {
  models.Meal.findAll(
    {
      where: { id: req.params.id },
      attributes: attrs,
      include: [{
        model: models.Food,
        as: 'foods',
        attributes: foodAttrs,
        through: { attributes: [] }
      }],
    })
    .then(meal => {
      res.json(meal)
    })
    .catch((e) => { throw e })
}

module.exports = getMeals, getMeal