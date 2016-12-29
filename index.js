var express = require('express');
var request = require('request');
var app = express();

app.use('/', function(req, res) {
    var url = 'http://sonar.corproot.com/api/timemachine/index' + req.url;
    req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);
