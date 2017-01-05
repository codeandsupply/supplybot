var enterReplies = [
	'Hi!',
	'Welcome!',
	'Hello there!',
	'Hello, friend!'
];
var welcomePrompts = [
    "What's your favorite color?",
    "Do you have a favorite programming language?",
    "Do you like ketchup?",
    "What is your favorite car?",
    "Where are you from?",
    "What's your favorite movie?",
    "What are your hobbies?",
    "What's your hidden talent?",
    "Which animal would you choose to be?",
    "What is your favorite book?",
    "Which time period would you visit in history?",
    "What's your dream job?",
    "Where is your dream vacation spot?",
    "What is your favorite sport?",
    "Do you like to run?",
    "Do you like cheeseburgers?",
    "Have you ever been skydiving?",
    "Do you like coffee?",
    "Do you speak any languages other than English? If so, what?"
];

module.exports = function(robot) {
  return robot.enter(function(res) {
    res.send('Someone new! '+res.random(enterReplies)+' Everyone say hi! :wave:');
    res.send("Our conduct policies are linked in the channel title.");
    res.send("If you ever have an issue, leave a message in #feedback or contact an admin privately (j&#x200b;ustinxreese, e&#x200b;mdantrim, c&#x200b;olindean).");
    return res.send('Happy to have you here! '+res.random(welcomePrompts));
  });
};
