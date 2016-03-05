module.exports = (poll) => {
  var count = {};
    for(var key in poll.votes){
        var value = poll.votes[key];
        if (count[value]){
          count[value]++
        } else {
          count[value] = 1
        }
  };
    return count;
}
