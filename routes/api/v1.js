const express = require('express');
const router = express.Router();
const sequelize = require('../../sequelize')
const Food = require('../../models/food')

router.get('/foods', function (req, res) {
  Food(sequelize).findAll()
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => { throw e });
});

router.get('/foods/:id', function (req, res) {
  Food(sequelize).findAll({ where: { id: req.params.id } })
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => {throw e});
});

router.post('/foods', function (req, res) {
  foodParams = req.body.food
  Food(sequelize).create({ name: foodParams.name, calories: foodParams.calories })
    .then(food => {
      res.status(201).json({ food: food })
    })
    .catch((e) => { console.log(e) });
});

router.patch('/foods/:id', function (req, res) {
  food = Food(sequelize).findAll({ where: { id: req.params.id } }).get({ plain: true })

  foodParams = req.body.food

  food.update({ name: foodParams.name, calories: foodParams.calories })
    .then(food => {
      res.json({ food: food })
    })
    .catch((e) => { console.log(e) });
});

module.exports = router;