module.exports = function(robot) {
  return robot.hear(/quiet in here/i, function(msg) {
    return msg.http("http://www.chatoms.com/chatom.json?Normal=1&Fun=2&Philosophy=3&Out+There=4&Love=5&Personal=7").get()(function(err, res, body) {
      return msg.send("Maybe this will start a conversation? " + JSON.parse(body).text);
    });
  });
};
