var socket = io();

var connectionCount = $('#connection-count');
var statusMessage = $('#status-message');
var buttons = $('button');
var aVoteCount = $("#a");
var bVoteCount = $('#b');
var cVoteCount = $('#c');
var dVoteCount = $('#d');
var yourVote = $('#your-vote')

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
  $('#status-message').fadeOut(2000);
});

socket.on('voteCount', function (votes) {
  aVoteCount[0].innerHTML = votes.A;
  bVoteCount[0].innerHTML = votes.B;
  cVoteCount[0].innerHTML = votes.C;
  dVoteCount[0].innerHTML = votes.D;
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    $.each(buttons, function(index, value) {value.remove()})
    socket.send('voteCast', this.innerText);
    yourVote.append(this.innerText)
  });
}
