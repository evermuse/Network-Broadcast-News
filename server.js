var net = require('net');
var fs = require('fs');
var split = require('split');

//Port to listen on

var HOST = '0.0.0.0';
var PORT = 6969;

//socket array

var clients = [];

//spin up the server and listen

net.createServer(function(socket) {

  socket.name = socket.remoteAddress + ':' + socket.remotePort;

  //push the new socket to the array

  //increment before display
  clients.push(socket);
  socket.id = clients.length;

  console.log('Client ' + socket.id + ' is now connected\n');

  socket.write('Welcome ' + socket.name + '\n' + 'your id is ' + socket.id + '\n');
  broadcast(socket.name + ' joined the chat\n', socket);

  //process socket data and write to the stdout

  socket.on('data', function(data) {

    process.stdin.setEncoding('utf8');
    process.stdout.write(data);

  });

  process.stdin.on('data', function (chunk) {

    broadcast('admin: ' + chunk);

  });

  function broadcast(message, sender) {

    clients.forEach(function(client) {

      if (client === sender) return;

      client.write(message);

    });

  }

  //watch for socket close and filter the exiting socket from the array

  socket.on('close', function(data) {

    console.log('Socket ' + socket.id + ' is now Closed\n');

    sockets = sockets.filter(function(current) {

      if (current !== socket) {

        return current;

      }

    });

  });

}).listen(PORT, HOST);

console.log('server listening on port ' + PORT);

