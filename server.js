var http = require('http'),
    express = require('express'),
    path = require('path');

const sendRequest = require("./send_request")
var app = express();
var jsonObject = require("./send_request").jsonObject;
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //A
app.set('view engine', 'jade'); //B

app.use(express.static(path.join(__dirname, 'public')));


var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate(),
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear();
var today = dayOfWeek + " " + dayOfMonth + " " + curMonth + " " + curYear;

var datum

app.get('/', function (req, res) {
    if(req.query.datum){
        datum = req.query.datum
    }else{
        datum = today
    }
    if(req.query.ort){
        datum = req.query.ort
    }else{
        datum = 'Stockholm, SE'
    }
    const data = {
    // ifis_bonetider_widget_city: 'Stockholm, SE',
    ifis_bonetider_widget_city: req.query.ort,//Karlstad, SE Märsta, SE Uppsala, SE Örebro, SE
    ifis_bonetider_widget_date: datum
    // ifis_bonetider_widget_date: format(Date.now(), 'EEEE dd MMMM yyyy')
};
    sendRequest.sendRequest(data);
    setTimeout(function afterTwoSeconds() {
        const result = jsonObject;
        // console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    }, 1000)

    //res.send(JSON.stringify(sendRequest));
});

app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
