var express = require('express');
var express = require('express');
var router = express.Router();

/* GET foods listing. */
router.get('/', function (req, res, next) {
  res.send('foooooods');
});

module.exports = router;