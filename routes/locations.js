var express = require('express');
var router = express.Router();
var s = require('./search')

/* GET locations page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('locations');
  collection.find({},{},function(e,docs){
    
    console.log('\n');
    console.log(docs);
    console.log('\n');
    
        res.render('locations', {
          title: 'Weather4U',
          locations: docs
    });
  });
});

module.exports = router;