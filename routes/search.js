var express = require('express');
var router = express.Router();
var YQL = require('yql');

var result;

/* GET redirect to home */
router.get('/', function (req, res, next) {
  res.redirect('../');
});

/* POST search */
router.post('/', function (req, res, next) {
  
  var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${req.body.location}") and u="c" `);
    
  query.exec(function(err, data) {
    
    if(err) {
      console.log(err);
      return;
    }
    
    result = data.query.results.channel;
    
    res.render('search', {
      title: 'Weather4U',
      page: ' - ' + result.location.city + ', ' + result.location.country,
      search: result
    });
  }); // API call
});

/* POST save location. */
router.post('/save', function(req, res) {

  req.db.get('locations').update(
    {
      city: result.location.city,
      country: result.location.country
    },
    {
      city: result.location.city,
      country: result.location.country
    },
    {
      upsert: true
    }, 
    function (err,oc) {
      if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
      } else {
      // And forward to success page
      res.redirect("../locations");
    }
  }); // db insert if location doesn't exist already
}); // POST

module.exports = router;