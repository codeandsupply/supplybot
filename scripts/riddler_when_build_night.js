_ = require('lodash/fp');
var eventsUrl = process.env.EVENTS_URL;

module.exports = function (robot) {
  var now;
  var titleOf = function (e) { return e.title; };
  var dateOf = function (e) { return e.date; };
  var locationOf = function (e) { return e.location || "(location not set)"; };
  var dateSorted = _.sortBy(dateOf);
  var dateFilter = _.filter(function (event) { return (event.date !== null); });
  var findBuildNight = _.find(function (e) {
    return e.title === 'Build Night' && new Date(e.date) >= now;
  });

  var ensureFindBuildNight = function (e) {
    if (findBuildNight(e) === undefined) {
      return "Build Night has not been scheduled.";
    } else {
      return concatBuildNight(findBuildNight(e));
    }
  };
  var regexDate = function (date) { return /(\d+).(\d+).(\d+).(\d+).(\d+)/.exec(date); };
  var formatDate = function (date) {
    if ((date !== false) && (date !== "(date not set)")) {
      var regexed = regexDate(date);
      return regexed[2] + "/" + regexed[3] + "/" + regexed[1] + " at " + formatTime(regexed[4], regexed[5]);
    } else {
      return "(date not set)";
    }
  };
  var formatTime = function (hour, minute) {
    var parsedHour = parseInt(hour);
    if (parsedHour > 12) {
      parsedHour -= 12;
      return parsedHour.toString(10) + ":" + minute + "pm";
    } else {
      return hour + ":" + minute + "am";
    };
  };
  var concatBuildNight = function (e) { return "Build Night is on " + formatDate(dateOf(e)) + ", " + locationOf(e); };
  var nextBuildNight = _.flow(dateFilter, dateSorted, ensureFindBuildNight);

  return robot.hear(/build night/i, function (msg) { // returns when/where of build night
    if (!eventsUrl) {
      msg.send('Please set the EVENTS_URL environment variable.');
      return;
    }
    return msg.http(eventsUrl).get()(function (err, res, body) {
      if (err) {
        msg.send('Sorry, there was an error getting the event list.');
        return;
      }
      now = new Date();
      var json = JSON.parse(body);
      return msg.send(nextBuildNight(json));
    });
  });
};
