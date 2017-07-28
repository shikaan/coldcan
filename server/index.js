//gifshot
//http://cliffordhall.com/2016/10/creating-video-server-node-js/
//https://github.com/h2non/videoshow


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendStatus(200);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

	socket.on('video-chunk', function(chunk) {
		console.log(chunk);
	})
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});