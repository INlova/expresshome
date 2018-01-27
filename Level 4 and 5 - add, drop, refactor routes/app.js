var express = require('express');
var app = express();

app.use(express.static('public'));




var router = require('./routes/cities');
app.use('/cities', router);


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Running expressHW project on 3000');
});
