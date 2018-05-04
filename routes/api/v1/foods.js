const express = require('express');
const router = express.Router();
const sequelize = require('../../../sequelize')
const Food = require('../../../models/food')

/* GET foods listing. */
router.get('/', function (req, res) {
  Food(sequelize).findAll()
    .then(foods => {
      res.json(foods)
    })
    .catch(() => console.log("Something went wrong"));
});

module.exports = router;