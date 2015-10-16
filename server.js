var net = require('net');
var fs = require('fs');
var split = require('split');

//Port to listen on

var HOST = '0.0.0.0';
var PORT = 6969;

var sockets = [];

//spin up the server and listen

net.createServer(function(socket) {

  console.log('client connected');

  socket.on('data', function(data) {

    //socket.write(data.toString().toUpperCase());

    process.stdin.setEncoding('utf8');
    process.stdout.write(data);

    // process.stdin.on('data', function (chunk) {

    //   process.stdout.write('data:');

    // });

  });

  socket.on('close', function(data) {

    console.log('Socket Closed');

  });

}).listen(PORT, HOST);

console.log('server listening on port ' + PORT);

