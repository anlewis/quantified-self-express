const express = require('express');
const router = express.Router();
const meals = require('../../../controllers/meals')

router.get('/', function (req, res) {
    getMeals(req, res)
});

router.get('/:id', function (req, res) {
    getMeal(req, res)
});

router.post('/:id/foods/:foodId', function (req, res) {
    postFoodToMeal(req, res)
});

router.delete('/:id/foods/:foodId', function (req, res) {
    deleteFoodFromMeal(req, res)
});

module.exports = router;