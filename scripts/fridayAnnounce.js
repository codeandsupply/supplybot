var fridayGifs;
var schedule = require('node-schedule');

fridayGifs = [
              'http://giphy.com/gifs/dancing-party-friday-d89VuJ4GflFfO',
              'http://giphy.com/gifs/XHHWeEGv0ISEU',
              'http://giphy.com/gifs/friday-party-hard-3o6Zt6JklGpl9Nkz1C',
              'http://giphy.com/gifs/g9MP2kAcKYSru',
              'http://giphy.com/gifs/DLQVvOYkVZazS',
              'http://giphy.com/gifs/party-friday-ready-90pYXJJ5F95iE',
              'http://giphy.com/gifs/party-lxNwkOUOcKD9C',
              'http://giphy.com/gifs/friday-weekend-finally-3o7WTqZqJNyoCLnqJW',
              'http://giphy.com/gifs/friday-feeling-1iYG017UokdODQc0',
              'http://giphy.com/gifs/party-friday-tgif-4wDysN7W80cCs',
              'http://giphy.com/gifs/party-friday-drunk-oYQSUOVe97yQ8'
             ]; 

module.exports = function(robot) {
    var announceFriday = function() { 
        return robot.messageRoom('#chat', "It's Friday!! We made it!!\n" + fridayGifs[ Math.floor(Math.random() * fridayGifs.length) ]);
    }

    schedule.scheduleJob('0 0 15 * * 5', announceFriday);

}
    


 
