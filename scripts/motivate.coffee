# Description:
#   Motivates users
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   !m <user> - Motivates <user>
#   !m * - Motivates channel
#
# Author:
#   colindean

module.exports = (robot) ->

  motivate = (who) -> "You're doing good work, " + who + "!"

  robot.hear /\!m (@?\w+)/i, (msg) ->
    user = msg.match[1]
    msg.send motivate user

  robot.hear /\!m \*/i, (msg) ->
    msg.send motivate msg.message.room
