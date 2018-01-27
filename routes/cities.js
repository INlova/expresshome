var express = require('express');
var router = express.Router();
var _ = require('lodash'); //lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings



var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var parseCityName = require('./parse-city-name')();



var originalCities = {
  'Miami': 'Florida',
  'Boston': 'Massachusetts',
  'LA': 'California',
  'San Francisco': 'California',
  'NYC': 'New York'
};
var cities= _.clone(originalCities);




var resetRoute = router.route('/reset');

resetRoute.get(function(request, response) {
  cities= _.clone(originalCities);
  response.redirect('/');
});



router.route('/')
  .get(function (request, response) {
    var names = Object.keys(cities);  
    if(request.query.limit >= 0){
      response.json(names.slice(0, request.query.limit));
    }else{
      response.json(names);
    }
  })
  .post(parseUrlencoded, function (request, response) {
    var newCity = request.body;
    cities[newCity.name] = newCity.description;

    response.status(201).json(newCity.name);
  });



router.route('/:name')
  .all(parseCityName) 
  .get(function (request, response) {
    var description = cities[request.cityName];

    if(!description){
      response.status(404).json('No description found for ' + request.model);
      
    }else{
      response.json(description);
    }
  })
  .delete(function (request, response) {
    delete cities[request.cityName];
    response.sendStatus(200);
  });

module.exports = router;