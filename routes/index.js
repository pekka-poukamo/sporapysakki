var express = require('express');
var router = express.Router();
var http = require('http');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
	http.get('http://api.reittiopas.fi/hsl/prod/?user=' + process.env.USER + '&pass=' + process.env.PASSWORD + '&request=stop&code=' + process.env.STOPCODE, (httpres) => {
		// console.log(res);
		var apires = "";

		httpres.setEncoding('utf-8');

		httpres.on('data', (chunk) => {
			apires += chunk;
		});

		httpres.on('end', () => {
			var json = JSON.parse(apires)[0];
			var times = [];

			// console.log(json)

			for (var i = 0; i < json.departures.length; i++) {
				times.push(parseDate(json.departures[i]));
			}

			res.render('index', {times: times});
		});
	});
});

function parseDate(departure) {
	var time = departure.time.toString();
	if (time.length < 4) {
		time = '0' + time;
	}

	time = time + departure.date;

	return moment(time, "HHmmYYYYMMDD");
}

module.exports = router;
