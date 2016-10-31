var enterReplies;

enterReplies = ['Hi!', 'Welcome!', 'Hello there!', 'Hello, friend!'];
welcomePrompts = ["What's your favorite color?", "Do you have a favorite programming language?",
				"Do you like ketchup?", "What is your favorite car?" , "Where are you from?", "What's your favorite movie?", "What are your hobbies?", "What’s your hidden talent?", "Which animal would you choose to be?", "What is your favorite book?", "Which time period would you visit in history?", "What's your dream job?", "Where is your dream vacation spot?", "What is your favorite sport?", "Do you like to run?", "Do you like cheeseburgers?", "Have you ever been skydiving?", "Do you like coffee?"];

module.exports = function(robot) {
  return robot.enter(function(res) {
    res.send('Someone new! '+res.random(enterReplies)+' Everyone say hi! :wave:');
    res.send('If you haven\'t read them yet, our conduct policies are linked in the channel title.');
    return res.send('Happy to have you here! '+res.random(welcomePrompts));
  });
};
