var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registry', function(req, res, next){
    res.render('index', { title: 'Express' });
    console.dir(req.body);
});

module.exports = router;
