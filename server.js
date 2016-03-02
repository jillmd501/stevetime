const http = require('http');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const server = http.createServer(app)
                 .listen(port, function () {
                    console.log('Listening on port ' + port + '.');
                  });

const socketIo = require('socket.io');
const io = socketIo(server);

app.use(express.static('public'));
app.locals.title = 'Steve Time';

app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var votes = {};

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, message) {
  if (channel === 'voteCast') {
    votes[socket.id] = message;
    socket.emit('voteCount', countVotes(votes));
    socket.emit('userVote', message);
  	}
	});

	socket.on('disconnect', function () {
	  console.log('A user has disconnected.', io.engine.clientsCount);
	  delete votes[socket.id];
	  socket.emit('voteCount', countVotes(votes));
	  io.sockets.emit('usersConnected', io.engine.clientsCount);
	});
});


function countVotes(votes) {
var voteCount = {
    'This is old hat to me': 0,
    'I have an okay understanding of this': 0,
    'I have no idea what you are babbling about': 0,
    'Where am I?': 0
};
  for (var vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}

module.exports = app;
