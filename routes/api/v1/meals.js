const express = require('express');
const router = express.Router();
const sequelize = require('../../../sequelize')
const Meal = require('../../../models/meal')
const meals = require('../../../controllers/meals')

router.get('/', function (req, res) {
  getMeals(req, res)
});

module.exports = router;