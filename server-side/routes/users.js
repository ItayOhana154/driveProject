var express = require('express');
var router = express.Router();

const users = [
  { name: 'ofek', password: 'fdf', files: ['er', 'erer'] },
  { name: 'itay', files: ['rtrer', 'erertrtr'] }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:name', function (req, res, next) {
  let user = users.find((user) => user.name == req.params.name)

  res.send(JSON.stringify(user));
});

module.exports = router;
