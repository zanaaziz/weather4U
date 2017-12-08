var express = require('express');
var router = express.Router();
var YQL = require('yql');
  
var pop_weather = {};
  
var popular_locations = [
  "Dublin, Ireland",
  "Alaska, United States"
];

popular_locations.forEach(function(popular_location, currentLocation){
  pop_weather[popular_location] =  {};
  
  var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${popular_location}") and u="c" `);
  
  query.exec(function(err, data) {
    
    if(err){
      console.log(err);
      return;
    }

    pop_weather[popular_location] = {
        day: data.query.results.channel.item.forecast[0].day,
        date: data.query.results.channel.item.forecast[0].date,
        condition: data.query.results.channel.item.forecast[0].text,
        high: data.query.results.channel.item.forecast[0].high,
        low: data.query.results.channel.item.forecast[0].low,
        windspeed: data.query.results.channel.wind.speed,
        humidity: data.query.results.channel.atmosphere.humidity,
        visibility: data.query.results.channel.atmosphere.visibility,
        sunrise: data.query.results.channel.astronomy.sunrise,
        sunset: data.query.results.channel.astronomy.sunset
    };
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