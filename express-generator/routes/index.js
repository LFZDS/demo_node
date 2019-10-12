var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getData', function(req, res, next) {
    console.log(1111, req.body);
});

module.exports = router;
