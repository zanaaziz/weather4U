var express = require('express');
var router = express.Router();
var YQL = require('yql');

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('search', {
      title: 'Weather4U',
      search: {}
  });
});

/* POST search */
router.post('/', function (req, res) {
  
  var query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${req.body.location}") and u="c" `);
    
    query.exec(function(err, data) {
      
      if(err) {
        console.log('`\n\n\n\nERRORRRR\n\n\n\n');
        return;
      }
      
      var forecast = data.query.results.channel.item.forecast;

      console.log("\n");
      console.log(forecast);
      console.log("\n");
    
      res.render('search', {
        title: 'Weather4U',
        location: data.query.results.channel.item.title,
        search: forecast
      });
      
    }); // API call
});

module.exports = router;