var express = require('express');
var router = express.Router();
var YQL = require('yql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Weather4U'
  });
});

/* POST weather search */
router.post('/', function (req, res) {
  res.render('index', {
    title: 'Weather4U'
  });
  
  var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${req.body.location}") and u="c" `);
  
  query.exec(function(err, data) {
    var location = data.query.results.channel.location;
    var condition = data.query.results.channel.item.condition;
    var weather = data.query.results.channel.item.forecast;
    
    console.log("\n\n");
    console.log('The current weather in ' + location.city + ', ' + location.country + ' is ' + condition.text + ' at ' + condition.temp + ' degrees.');
    console.log("\n\n");
    console.log(weather);
    console.log("\n\n");
  });
});

module.exports = router;