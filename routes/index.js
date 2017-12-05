var express = require('express');
var router = express.Router();
var YQL = require('yql');
  
var pop_weather = {};
  
var popular_locations = [
  "Dublin, Ireland",
  "Ibiza, Spain",
  "Tokyo, Japan",
  "Hong Kong, China"
];

popular_locations.forEach(function(popular_location, currentLocation){
  var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${popular_location}") and u="c" `);

  pop_weather[popular_location] =  [];
  
  query.exec(function(err, data) {
    var forecast = data.query.results.channel.item.forecast;

    forecast.forEach(function(dayOfWeek, currentDay){
      var day = forecast[currentDay].day;
      var date = forecast[currentDay].date;
      var high = forecast[currentDay].high;
      var low = forecast[currentDay].low;
      var condition = forecast[currentDay].text;
      
      pop_weather[popular_location].push({
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
    console.log(pop_weather);
    console.log("\n")
    res.render('index', {
    title: 'Weather4U',
    pop_weather: pop_weather
  });
});

module.exports = router;