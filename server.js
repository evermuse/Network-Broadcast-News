var net = require('net');
var fs = require('fs');
//var split = require('split');

//Port to listen on

var HOST = '0.0.0.0';
var PORT = 6969;

//socket array

var sockets = (function() {

  return [];

})();

var people = {};

//spin up the server and listen

net.createServer(function(socket) {

  socket.name = socket.remoteAddress + ':' + socket.remotePort;

  //push the new socket to the array & increment before display

  sockets.push(socket);
  socket.id = sockets.length;
  socket.username = null;

  console.log('Client ' + socket.id + ' is now connected\n');
  socket.write('Welcome ' + socket.name + '\n' + 'your id is ' + socket.id + '\n' + 'Please enter a username: ');

  broadcast(socket.name + ' joined the chat\n', socket);

  //process socket data and write to the stdout

  socket.on('data', function(data) {

    if (socket.username === null) {

      if (people[username] === undefined || people[username] !== data.toString()) {

        socket.write('Username is already taken. Please enter a unique username: ');

      }

      socket.username = data;
      people.username = data;

    }

    process.stdin.setEncoding('utf8');
    process.stdout.write(data);

  });

  //watch for socket close and filter the exiting socket from the array

  socket.on('close', function(data) {

    console.log('Socket ' + socket.id + ' is now Closed\n');

    sockets = sockets.filter(function(current) {

      if (current !== socket) {

        return current;

      }

    });

  });

}).listen(PORT, HOST, function() {

  console.log('server listening on port ' + PORT);

  //allows Admin to broadcast to all users

  process.stdin.on('data', function (chunk) {

    broadcast('[ADMIN]: ' + chunk);

  });

});

//broadcast function

function broadcast(message, sender) {

  sockets.forEach(function(client) {

    //console.log(client);

    if (client === sender) return;

    client.write(message);

  });

}
