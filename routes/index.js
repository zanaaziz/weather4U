var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Weather4U'
      
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', {
      title: 'Weather4U'
      
  });
});

/* GET locations page. */
router.get('/locations', function(req, res, next) {
  res.render('locations', {
      title: 'Weather4U'
      
  });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {
      title: 'Weather4U'
      
  });
});

module.exports = router;