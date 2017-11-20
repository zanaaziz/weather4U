var express = require('express');
var router = express.Router();
var YQL = require('yql');

/* GET forecast. */
router.get('/:city/:country', function(req, res, next) {
  var city = req.params.city;
  var country = req.params.country;

  var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}, ${country}") and u="c" `);
  
  query.exec(function(err, data) {
    var location = data.query.results.channel.location;
    var condition = data.query.results.channel.item.condition;
    
    res.send('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
  });
});

module.exports = router;