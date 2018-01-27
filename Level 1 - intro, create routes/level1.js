var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function(request, response) {
	response.send('Hello World!');
});
app.get('/name', function(request, response) {
	var name = "@getmenova";
	response.json(name);
});
app.get('/redirect', function(request, response) {
	response.redirect(301, '/surprise');
});
app.get('/date', function(request, response) {
	var date = new Date();
	response.send(date);
});
app.get('/cities', function(request, response) {
	var cities = ["Cambridge", "Providence", "Las Vegas", "Atlantic City", "New York City"];
	response.send(cities);
});
app.listen(3000);