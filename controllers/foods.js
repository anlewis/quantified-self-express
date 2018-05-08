const models = require('../models')

const attrs = ['id', 'name', 'calories']

getFoods = function (req, res) {
  models.Food.findAll({ attributes: attrs })
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => { console.log("WHAT WHY HOW") })
}

getFood = function (req, res) {
  models.Food.findAll({ where: { id: req.params.id }, attributes: attrs })
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => { throw e });
}

postFood = function (req, res) {
  let foodParams = req.body.food
  models.Food.create({ name: foodParams.name, calories: foodParams.calories })
    .then(food => {
      res.status(201).json({ food: food })
    })
    .catch((e) => { throw e });
}

patchFood = function (req, res) {
  let foodParams = req.body.food
  models.Food
    .findById(req.params.id)
    .then(food => {
      food.update({ name: foodParams.name, calories: foodParams.calories })
        .then(food => {
          res.json({ food: food })
        })
        .catch((e) => { throw e });
    })
    .catch((e) => { throw e });
}

deleteFood = function (req, res) {
  models.Food.findById(req.params.id)
    .then(food => {
      food.destroy();
      res.status(204).end();
    })
    .catch((e) => { throw e });
}

module.exports = getFoods, getFood, postFood, patchFood, deleteFood