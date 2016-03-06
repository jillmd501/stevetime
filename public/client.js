var socket = io();
var pollId = window.location.pathname.split('/')[2];
var buttons = document.querySelectorAll('.vote-button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', pollId, this.innerText);
  });
}

var resultCount = document.getElementById('vote-count')

socket.on('voteCount', function (votes) {
  var results = "Results: ";
  for (var vote in votes) {
    results = vote + ": " +  votes[vote] + " "
  };
  resultCount.innerText = results;
});

var userVote =document.getElementById('user-vote')
