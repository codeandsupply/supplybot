module.exports = function(robot) {
  robot.hear(/the bot should/i, function(msg) {
    msg.send("I'm open source. Pull requests accepted.");
  });
  robot.hear(/where is the code for the bot/i, function(msg) {
    msg.send("https://gitlab.com/codeandsupply/supplybot");
  });
  robot.respond(/show me the code/i, function(msg) {
    msg.send("https://gitlab.com/codeandsupply/supplybot");
  });
};
