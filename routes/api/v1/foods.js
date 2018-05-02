var express = require('express');
var router = express.Router();

/* GET foods listing. */
router.get('/', function (req, res, next) {
  res.json({ message: 'hooray! here is some json at our foods#index!' });
});

module.exports = router;