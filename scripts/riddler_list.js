_ = require('lodash/fp');
var schedule = require('node-schedule');
var eventsUrl = process.env.EVENTS_URL;
var announcer;

module.exports = function(robot) {
    var titleOf              = function(e) { return e.title || "(title undecided)"; };
    var dateOf               = function(e) { return e.date || "(date not set)"; };
    var locationOf           = function(e) { return e.location || "(location not set)"; };
    var firstFiveOf          = _.take(5);
    var dateSorted           = _.sortBy(function(e) { return e.date; });
    var titleDateLocationIn  = _.map(function(e) { return [titleOf(e), formatDate(dateOf(e)), locationOf(e)]; });
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
	var parsedHour = parseInt(hour);
	if ( parsedHour > 12 ) {
	    parsedHour -= 12;
	    return parsedHour.toString(10) + ":" + minute + "pm";
	} else {
	    return hour + ":" + minute + "am";
	};
    };
    var scheduleCarpool      = _.map(function(e) {
    if (e.date !== undefined) {
        var parse = e.date.substring(0, e.date.length-5);
        var eventDate = new Date(parse);
        var carDate = new Date(parse);
        carDate.setHours(carDate.getHours() - 3);
        now  = new Date();
        if(now < eventDate) {
            if(carDate < now) {
                carDate = new Date();
                carDate.setSeconds(carDate.getSeconds() + 1);
            }
            schedule.scheduleJob(carDate, announceCarpool);
        }
    }
    return e;
    });
    var announceCarpool = function(){ announcer.send("Don't forget about the #carpool channel if anyone needs a ride to the upcoming event!"); }
    var joinedNextFiveEvents = _.map(_.join(', '));
    var nextFiveEvents       = _.flow(dateSorted, firstFiveOf, scheduleCarpool, titleDateLocationIn, joinedNextFiveEvents);
    
    return robot.respond(/list/i, function(msg) { // returns next 5 events
    announcer = msg;
	return msg.http(eventsUrl).get()(function(err, res, body) {
        var json = JSON.parse(body);
        return msg.send("Next five C&S events:\n" + nextFiveEvents(json).join('\n'));
	});
    });
};
