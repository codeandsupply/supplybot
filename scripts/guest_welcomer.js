var enterReplies;

enterReplies = ['Hi', 'Welcome', 'Hello there', 'Hello, friend.'];

module.exports = function(robot) {
  return robot.enter(function(res) {
    res.send(res.random(enterReplies));
    res.send('Be sure to familiarize yourself with our conduct policies located at http://www.codeandsupply.co/code-of-conduct/');
    res.send('I encourage you to check out all the discussions going on by clicking the "channels" link in the left menu.');
    res.send('If you just want to idle, that\'s cool. Install Slack on your phone and add this team so you can check in on occassion.');
    return res.send('Happy to have you here');
  });
};
