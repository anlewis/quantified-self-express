var express = require('express');
var router = express.Router();
var db = require('../../../models')
var Food = db.Food

/* GET foods listing. */
router.get('/', function (req, res) {
  Food.findAll()
    .then(function (foods) {
      res.json(foods)
    })
});

module.exports = router;