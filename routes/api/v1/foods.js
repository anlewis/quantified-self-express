var express = require('express');
var router = express.Router();
var Food = require('../../../models/food')

/* GET foods listing. */
router.get('/', function (req, res) {
  Food.findAll()
    .then(function (foods) {
      res.json(foods)
    })
});

module.exports = router;