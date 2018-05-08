const express = require('express');
const router = express.Router();
const meals = require('../../../controllers/meals')

router.get('/', function (req, res) {
  getMeals(req, res)
});

module.exports = router;