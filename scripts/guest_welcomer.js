var enterReplies;

enterReplies = ['Hi', 'Welcome', 'Hello there', 'Hello, friend.'];

module.exports = function(robot) {
  return robot.enter(function(res) {
    res.send(res.random(enterReplies));
    res.send('Be sure to familiarize yourself with our conduct policies located at http://www.codeandsupply.co/code-of-conduct/');
    return res.send('Happy to have you here');
  });
};
