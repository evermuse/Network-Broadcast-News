var net = require('net');
var fs = require('fs');
var split = require('split');

var HOST = '0.0.0.0';
var PORT = 6969;

//create new socket

var client = new net.Socket();

client.connect(PORT, HOST, function() {

  console.log('Connected');

  client.write('Hello, server! Client 1 here\n');

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (chunk) {

    client.write('client 1: ' + chunk);

  });

});

client.on('data', function(data) {

  process.stdout.write(data);

});

client.on('close', function() {

  console.log('Connection closed');

});