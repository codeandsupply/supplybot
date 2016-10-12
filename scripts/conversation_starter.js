module.exports = function(robot) {
  return robot.respond(/chat/i, function(msg) {
    return msg.http("http://chatoms.com/chatom.json?Normal=1&Fun=2&Philosophy=3&Out+There=4&Love=5&Personal=7").get()(function(err, res, body) {
      return msg.send(JSON.parse(body).text);
    });
  });
};