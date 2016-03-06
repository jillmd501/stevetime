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
const bodyParser = require('body-parser');
const countVotes = require('./lib/count-votes');
const polls = require('./lib/polls');
const generateId = require('./lib/generate-id');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.locals.title = 'Steve Time';

//routes

app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/poll', function(req, res){
  var poll = req.body.poll;
  var id = generateId();
  var adminId = req.body.poll.adminId;
  polls[id] = poll;
  poll['adminId'] = adminId;
  poll['id'] = id;
  poll['votes'] = {};
  res.redirect('/polls/' + id + "/" + adminId);
});

app.get('/polls/:id', function(req, res){
  var poll = app.locals.polls[req.params.id];
  res.render('admin-poll-view', {poll: poll, votes: countVotes(poll)});
});

app.get('/polls/admin/:adminId', function(req, res){
  var pollList = [];
  var keys = Object.keys(app.locals.polls)
  for (var i = 0; i < keys.length; i++){
    var poll = app.locals.polls[keys[i]];
    if(poll['adminId'] === req.params.adminId){ pollList.push(poll)}
  }
  res.render('steve-admin-view', {polls: pollList});
})

app.get('/polls/:id/:adminId', function(req, res){
  var poll = polls[req.params.id];
  console.log(poll,"poll")
  res.render('steve-admin-view', {poll: poll, id: req.params.id, adminID: req.params.adminId, votes: countVotes(poll)});
})

//sockets

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, pollId, message) {
    if (channel === 'voteCast') {
      poll = polls[pollId]
      poll['votes'][socket.id] = message;
      socket.emit('voteCount', countVotes(poll));
  	}
	});
});

module.exports = app;
