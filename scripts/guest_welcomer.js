var enterReplies;

enterReplies = ['Hi!', 'Welcome!', 'Hello there!', 'Hello, friend!'];

module.exports = function(robot) {
  return robot.enter(function(res) {
    res.send('Someone new! '+res.random(enterReplies));
    res.send('Be sure to familiarize yourself with our conduct policies, there should be a link in the header.');
    return res.send('Happy to have you here!');
  });
};
