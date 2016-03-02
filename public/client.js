var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var buttons = $('button')
var aVoteCount = document.getElementById('a');
var bVoteCount = document.getElementById('b');
var cVoteCount = document.getElementById('c');
var dVoteCount = document.getElementById('d');
var yourVote = $('#your-vote')

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
  $('#status-message').fadeOut(2000);
});

socket.on('voteCount', function (votes) {
  aVoteCount.firstChild.data = votes.A;
  bVoteCount.firstChild.data = votes.B;
  cVoteCount.firstChild.data = votes.C;
  dVoteCount.firstChild.data = votes.D;
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    $.each(buttons, function(index, value) {value.remove()})
    socket.send('voteCast', this.innerText);
    yourVote.append(this.innerText)
  });
}
