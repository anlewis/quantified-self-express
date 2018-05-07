const express = require('express');
const router = express.Router();
const sequelize = require('../../sequelize')
const Food = require('../../models/food')

/* GET foods listing. */
router.get('/foods', function (req, res) {
  Food(sequelize).findAll()
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => console.log(e));
});

router.get('/food/:id', function (req, res) {
  Food(sequelize).findAll({ where: { id: req.params.id } })
    .then(foods => {
      res.json(foods)
    })
    .catch((e) => console.log(e));
});

module.exports = router;