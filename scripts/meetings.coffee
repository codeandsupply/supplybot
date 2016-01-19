module.exports = (robot) ->
  store_the_thing = (thing) ->
    previous = robot.brain.get 'remembered'
    if previous != null
      thing = previous + '\n' + thing
    robot.brain.set 'remembered', thing

  robot.respond /recall (.*) later/i, (msg) ->
    thing_to_remember = msg.match[1]
    store_the_thing(thing_to_remember)

  robot.respond /recall/i, (msg) ->
    msg.reply robot.brain.get 'remembered'
  
  robot.respond /forget/i, (msg) ->
    robot.brain.remove 'remembered'
