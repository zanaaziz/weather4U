var express = require('express');
var router = express.Router();
var YQL = require('yql');

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('popular_locations');
  
  collection.find({},{},function(e,docs){
    
    var pop_weather = {};
    
    docs.forEach(function(popular_location, currentLocation){
      pop_weather[popular_location.city + ", " + popular_location.country] =  {};
      
      var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${popular_location.city + ", " + popular_location.country}") and u="c" `);
      
      query.exec(function(err, data) {
        
        if(err){
          console.log(err);
          return;
        }
    
        pop_weather[popular_location.city + ", " + popular_location.country] = {
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

    setTimeout(function() {
      res.render('index', {
        title: 'Weather4U',
        pop_weather: pop_weather
      });
    }, 1000);
  });
});

module.exports = router;