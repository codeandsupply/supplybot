remarks = [
  "Great job, %!",
  "Way to go, %!",
  "% is amazing, and everyone should be happy this amazing person is around.",
  "I wish I was more like %.",
  "% is good at like, 10 times more things than I am.",
  "%, you are an incredibly sensitive person who inspires joyous feelings in all those around you.",
  "%, you are crazy, but in a good way.",
  "% has a phenomenal attitude.",
  "% is a great part of the team!",
  "I admire %'s strength and perseverance.",
  "% is a problem-solver and cooperative teammate.",
  "% is the wind beneath my wings.",
  "% has a great reputation.",
	"Great job today, everyone!",
	"Go team!",
	"Super duper, gang!",
	"If I could afford it, I would buy you all lunch!",
	"What a great group of individuals there are in here. I'm proud to be chatting with you.",
	"You all are capable of accomplishing whatever you set your mind to.",
	"I love this team's different way of looking at things!"
]

module.exports = (robot) ->
  robot.listen(
    (message) ->
      return unless message.text
      Math.random() < 0.01
    (response) ->
      encourage = response.random remarks
      encouragingme = () -> encourage.replace "%", response.message.user.name
      response.send encouragingme()
      # response.send response.random allinclusive
  )
