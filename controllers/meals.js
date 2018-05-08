const models = require('../models')

const attrs = ['id', 'name']
const foodAttrs = ['id', 'name', 'calories']

getMeals = function (req, res) {
  console.log(models.Food)
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

module.exports = getMeals