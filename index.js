var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(setHeaders);
app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res, next){
    console.log(req.query);
    var params = stringifyParams(processData(req).params),
        url = 'http://sonar.corproot.com/api/timemachine/index' + params;
    console.log('requesting: ' + url);
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            res.send(body);
        }
        else{
            console.error('Request Error Occured!');
            console.error(error);
        }
    });
});

app.listen(app.get('port'), function(){
    console.log('Express started on port ' + app.get('port'));
});

function stringifyParams(data){
    // ?resource=com.wyndhamvo.ui:CustomerUI
    // &metrics=critical_violations,blocker_violations,major_violations,minor_violations,sqale_index
    // &fromDateTime=2016-12-13T00:00
    // &toDateTime=2016-12-21T23:59'
    var url = '';
    for (var i = 0; i < data.length; i++) {
        if(i === 0){
            url += '?';
        }else{
            url += '&';
        }
        url += data[i].name + '=' + data[i].value;
    }
    return url;
}

function processData(req){
    var context = {
            method: req.method,
            params: []
        };

    for(var p in req.query){
        context.params.push({
            'name': p,
            'value': req.query[p]
        });
    }
    return context;
}

function setHeaders(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
}
