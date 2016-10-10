var expect = require("chai").expect;
var path = require("path");

var Robot = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

var nock = require('nock');

var dateFormat = require('dateformat');

var mockEvents = require("../test/mocks/events.json");

var eventsDomain = 'http://test.com';
var eventsPath = '/events';

describe("Build Night - ", function () {
  var robot;
  var user;
  var adapter;

  beforeEach(function (done) {
    // create new robot, without http, using the mock adapter
    robot = new Robot(null, "mock-adapter", false, "Eddie");

    robot.adapter.on("connected", function () {

      // // only load scripts we absolutely need, like auth.coffee
      // process.env.HUBOT_AUTH_ADMIN = "1";
      // robot.loadFile(
      //   path.resolve(
      //     path.join("node_modules/hubot/src/scripts")
      //   ),
      //   "auth.coffee"
      // );

      process.env.EVENTS_URL = eventsDomain + eventsPath;

      // load the module under test and configure it for the
      // robot.  This is in place of external-scripts
      require("../scripts/riddler_when_build_night")(robot);

      // create a user
      user = robot.brain.userForId("1", {
        name: "mocha",
        room: "#mocha"
      });

      adapter = robot.adapter;

      done();
    });

    robot.run();
  });

  afterEach(function () {
    robot.shutdown();
  });

  it("should handle no events", function (done) {

    nock(eventsDomain)
      .get(eventsPath)
      .reply(200, mockEvents.noevents);

    adapter.on("send", function (envelope, strings) {
      expect(strings[0]).match(/Build Night has not been scheduled./);
      done();
    });

    adapter.receive(new TextMessage(user, "build night"));
  });

  it("should handle no build nights", function (done) {

    nock(eventsDomain)
      .get(eventsPath)
      .reply(200, mockEvents.nobuildnights);

    adapter.on("send", function (envelope, strings) {
      expect(strings[0]).match(/Build Night has not been scheduled./);
      done();
    });

    adapter.receive(new TextMessage(user, "build night"));
  });

  it("should handle multiple future build nights nights", function (done) {

    var mock = _.cloneDeep(mockEvents.nobuildnights);

    var later = evenLater = new Date();

    later.setDate(new Date().getDate() + 3);
    evenLater.setDate(new Date().getDate() + 20);

    mock.push({
      "id": mock.length+1,
      "status": "finalized",
      "description": "Description",
      "date": evenLater.toISOString(),
      "title": "Build Night"
    });

    mock.push({
      "id": mock.length+1,
      "status": "finalized",
      "description": "Description",
      "date": later.toISOString(),
      "title": "Build Night"
    });


    nock(eventsDomain)
      .get(eventsPath)
      .reply(200, mock);

    adapter.on("send", function (envelope, strings) {
      expect(strings[0]).to.equal(`Build Night is on ${later.toLocaleDateString()} at ${dateFormat(later, "UTC:h:MMtt")}, (location not set)`);
      done();
    });

    adapter.receive(new TextMessage(user, "build night"));
  });

  it("should handle a build night \"today\"", function (done) {

    var mock = _.cloneDeep(mockEvents.nobuildnights);

    var now = new Date();

    mock.push({
      "id": mock.length+1,
      "status": "finalized",
      "description": "Description",
      "date": now.toISOString(),
      "title": "Build Night"
    });

    nock(eventsDomain)
      .get(eventsPath)
      .reply(200, mock);

    adapter.on("send", function (envelope, strings) {
      expect(strings[0]).to.equal(`Build Night is on ${now.toLocaleDateString()} at ${dateFormat(now, "UTC:h:MMtt")}, (location not set)`);
      done();
    });

    adapter.receive(new TextMessage(user, "build night"));
  });

});
