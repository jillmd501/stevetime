var socket = io();
var pollId = window.location.pathname.split('/')[2];

// var connectionCount = document.getElementById('connection-count');
//
// socket.on('usersConnected', function (count) {
//   connectionCount.innerText = 'Connected Users: ' + count;
// });
//
// var statusMessage = document.getElementById('status-message');
//
// socket.on('statusMessage', function (message) {
//   statusMessage.innerText = message;
// });
//
var buttons = document.querySelectorAll('.vote-button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log(pollId, this.innerText);
    socket.send('voteCast', pollId, this.innerText);
  });
}
//
// var resultCount = document.getElementById('results')
//
//

// socket.on('voteCount-' + pollId, function (votes) {
//   alert();
//   var results = "Results: ";
//     for (var vote in votes) {
//       results = results + vote + ": " +  votes[vote] + " "
//     };
//   resultCount.innerText = results;
// });

// var userVote =document.getElementById('user-vote')
//
// socket.on('userVote', function (message) {
//   userVote.innerText = message;
// });
