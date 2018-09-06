module.exports = (robot) ->
  robot.topic (res) ->
    res.send "#{res.message.text}? That's a Paddlin'"
