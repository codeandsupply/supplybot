_ = require('lodash/fp');
var eventsUrl = process.env.EVENTS_URL;

module.exports = function(robot) {
    var titleOf              = function(e) { return e.title || "(title undecided)"; };
    var dateOf               = function(e) { return new Date(e.date) || "(date not set)"; };
    var locationOf           = function(e) { return e.location || "(location not set)"; };
    var currentEpoch         = function() { return Date.parse(new Date()); };
    var firstOneOf           = _.take(1);
    var titlesIn             = _.map(titleOf);
    var datesIn              = _.map(dateOf);
    var locationsIn          = _.map(locationOf);
    var dateSorted           = _.sortBy(function(e) { return Date.parse(e.date); });
    var dropPast             = _.dropWhile(function(e) { return currentEpoch() > Date.parse(e.date); });
    var titleDateLocationIn  = _.map(function(e) { return [titleOf(e), dateOf(e), locationOf(e)]; });
    var regexDate            = function(date) { return /(\d+).(\d+).(\d+).(\d+).(\d+)/.exec(date); };
    var formatDate           = function(date) {
      	if ((date !== false) && (date !== "(date not set)")) {
      	    var regexed = regexDate(date);
      	    return regexed[2] + "/" + regexed[3] + "/" + regexed[1] + " at " + formatTime(regexed[4], regexed[5]);
      	} else {
      	    return "(date not set)";
      	}
    };
    var formatTime           = function(hour, minute) {
	  var parsedHour           = parseInt(hour);
      	if ( parsedHour > 12 ) {
      	    parsedHour -= 12;
      	    return parsedHour.toString(10) + ":" + minute + "pm";
      	} else {
      	    return hour + ":" + minute + "am";
      	};
    };
    var joinedNextOneEvent   = _.map(_.join(', '));
    var nextOneEvent         = _.flow(dateSorted, dropPast, firstOneOf, titleDateLocationIn, joinedNextOneEvent);

    return robot.respond(/next up/i, function(msg) { // returns next 1 event
	    return msg.http(eventsUrl).get()(function(err, res, body) {
	      var json = JSON.parse(body);
	      return msg.send("Next C&S event: " + nextOneEvent(json));
	    });
    });
};
