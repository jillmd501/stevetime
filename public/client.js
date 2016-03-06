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
    results = results + vote + ": " +  votes[vote] + " "
  };
  resultCount.innerText = results;
});

// 
// socket.on('disableVotes', function(){
//   for (var i = 0; i < buttons.length; i++) {
//     buttons[i].className += " disabled";
//   };
//   adminClosedMessage.innerText = "Too Late! Poll is over!"
// })

var userVote =document.getElementById('user-vote')
