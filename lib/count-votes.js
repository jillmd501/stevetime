module.exports = (poll) => {
  return poll
  var voteCount = {};
  console.log(poll)
    poll['votes'].forEach(function(vote){
      if(voteCount[vote]){
        voteCount[vote]++;
      } else {
        voteCount[vote] = 1;
      }
    });
    return voteCount;
}
