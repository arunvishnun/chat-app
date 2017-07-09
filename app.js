var express = require("express");
var app     = express();
var path    = require("path");
var socket  = require('socket.io');

app.use(express.static(__dirname));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

var server = app.listen(3000, function() {
	console.log("Running at Port 3000");
});

var io = socket(server);
io.on('connection', function(socket) {
	console.log('socket connection extablished', socket.id);
	socket.on('chat', function(data) {
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data);
	});
});