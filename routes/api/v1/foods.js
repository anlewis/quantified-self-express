const express = require('express');
const router = express.Router();
const sequelize = require('../../../sequelize')
const Food = require('../../../models/food')

router.get('/', function (req, res) {
  Food(sequelize).findAll()
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => { throw e });
});

router.get('/:id', function (req, res) {
  Food(sequelize).findAll({ where: { id: req.params.id } })
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => { throw e });
});

router.post('/', function (req, res) {
  foodParams = req.body.food
  Food(sequelize).create({ name: foodParams.name, calories: foodParams.calories })
    .then(food => {
      res.status(201).json({ food: food })
    })
    .catch((e) => { throw e });
});

router.patch('/:id', function (req, res) {
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
});

router.delete('/:id', function (req, res) {
  Food(sequelize).findById(req.params.id)
    .then( food => {
      food.destroy();
      res.status(204).end();
    })
    .catch((e) => { throw e });
});

module.exports = router;