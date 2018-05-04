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
    .then(() => {
      done()
    })
    .catch(e => console.log(e))
});

module.exports = router;