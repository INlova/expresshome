/*global response*/
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/cities', function(req, res){
  var cities = ['Cambridge', 'Providence', 'Las Vegas', 'Atlantic City'];
  res.send(cities);
});

app.listen(3000);


