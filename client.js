var net = require('net');
var fs = require('fs');
var split = require('split');

var HOST = '0.0.0.0';
var PORT = 6969;

var client = new net.Socket();

client.connect(PORT, HOST, function() {

  console.log('Connected');

  client.write('Hello, server! Love, Client.');

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (chunk) {

    client.write('data: ' + chunk);

  });

});

client.on('data', function(data) {


});

client.on('close', function() {

  client.destroy(); // kill client after server's response
  console.log('Connection closed');

});