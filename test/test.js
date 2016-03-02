var assert = require('chai').assert;

var io = require('socket.io-client');

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var socketURL = 'http://localhost:3000';

describe('stuff', function(){
  it('responds', function(){
    var client = io.connect(socketURL, options);

    client.once("connect", function () {
      client.once("echo", function (message) {
          message.should.equal("Hello World");
          client.disconnect();
          done();
      });

      client.emit("echo", "Hello World");
    });
  });
});
