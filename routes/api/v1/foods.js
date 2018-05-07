const express = require('express');
const router = express.Router();
const sequelize = require('../../../sequelize')
const Food = require('../../../models/food')
const foods = require('../../../controllers/foods')

router.get('/', function (req, res) {
  getFoods(req, res)
});

router.get('/:id', function (req, res) {
  getFood(req, res)
});

router.post('/', function (req, res) {
  postFood(req, res)
});

router.patch('/:id', function (req, res) {
  patchFood(req, res)
});

router.delete('/:id', function (req, res) {
  deleteFood(req, res)
});

module.exports = router;