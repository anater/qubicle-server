var express = require('express');
var request = require('request');
var app = express();

app.use(setHeaders);
app.use('/', function(req, res) {
    var url = 'http://sonar.corproot.com/api/timemachine/index' + req.url;
    console.log(req.url);
    req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 4000);

function setHeaders(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}
