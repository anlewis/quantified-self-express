const Food = require('../models/food')
const sequelize = require('../sequelize')

getFoods = function (req, res) {
  Food(sequelize).findAll()
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => { console.log("WHAT WHY HOW") })
}

getFood = function (req, res) {
  Food(sequelize).findAll({ where: { id: req.params.id } })
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => { throw e });
}

postFood = function (req, res) {
  let foodParams = req.body.food
  Food(sequelize).create({ name: foodParams.name, calories: foodParams.calories })
    .then(food => {
      res.status(201).json({ food: food })
    })
    .catch((e) => { throw e });
}

patchFood = function (req, res) {
  let foodParams = req.body.food
  Food(sequelize)
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
  Food(sequelize).findById(req.params.id)
    .then(food => {
      food.destroy();
      res.status(204).end();
    })
    .catch((e) => { throw e });
}

module.exports = getFoods, getFood, postFood, patchFood, deleteFood