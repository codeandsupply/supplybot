var enterReplies = [
	'Hi!',
	'Welcome!',
	'Hello there!',
	'Hello, friend!',
  'Greetings, friend!'
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
    "Do you speak any languages other than English? If so, what?",
    "What was your first job?",
    "Have you ever met anyone famous?",
    "Seen any good movies lately you’d recommend?",
    "What was your favorite band 10 years ago?",
    "Been anywhere recently for the first time?",
    "What’s your favorite family tradition?",
    "Who had the most influence on you growing up?",
    "What was the first thing you bought with your own money?",
    "What’s something you want to do in the next year that you’ve never done before?",
    "Seen anything lately that made you smile?",
    "What’s your favorite place you’ve ever visited?",
    "Have you had your 15 minutes of fame yet?",
    "What’s the best advice you’ve ever heard?",
    "How do you like your eggs?",
    "Do you have a favorite charity you wish more people knew about?",
    "Do you collect anything?",
    "What’s your favorite breakfast cereal?"
];

module.exports = function(robot) {
  return robot.enter(function(res) {
    room = msg.message.room
    if(room == '#chat') {
      res.send(':wave: :tada:'+res.random(enterReplies)+'Our conduct policies are required to be followed and available at http://codeandsupply.co/policies/conduct.');
      res.send("If you ever witness misconduct, tag messages with the conduct-warning emoji to notify our #conduct-committee or message them privately");
      return res.send('Happy to have you here! '+res.random(welcomePrompts));
    }
  });
};
