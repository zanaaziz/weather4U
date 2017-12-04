var express = require('express');
var router = express.Router();
var YQL = require('yql');

  var popular_locations = [
      "Dublin, Ireland",
      "Moscow, Russia"
  ];
  
  var weather = {};
    
  popular_locations.forEach(function(popular_location, currentLocation){
    var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${popular_location}") and u="c" `);

    weather[popular_location] =  [];
    
    query.exec(function(err, data) {
      var forecast = data.query.results.channel.item.forecast;
  
      forecast.forEach(function(dayOfWeek, currentDay){
        var day = forecast[currentDay].day;
        var date = forecast[currentDay].date;
        var high = forecast[currentDay].high;
        var low = forecast[currentDay].low;
        var condition = forecast[currentDay].text;
        
        weather[popular_location].push({
            day: day,
            date: date,
            high: high,
            low: low,
            condition: condition
          });
        
      }); // forEach day
    }); // API call
  }); // forEach location


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("\n")
    console.log(weather);
    console.log("\n")
    res.render('index', {
    title: 'Weather4U',
    weather: weather
  });
});

/* POST weather search */
router.post('/', function (req, res) {
  res.render('index', {
    title: 'Weather4U'
  });
});

module.exports = router;