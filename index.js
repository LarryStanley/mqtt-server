var mqtt = require('mqtt');
var server = require('http').createServer();
var io = require('socket.io')(server);

// connect to the message server
var client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function () {
  client.subscribe('arklab');
});

io.on('connection', function(socket){
	client.on('message', function (topic, message) {
		console.log(message.toString());
		socket.emit('arklab', message.toString());
	});
});

server.listen(9001);