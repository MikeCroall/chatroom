var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
});

var connectionCount = 0;

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res) {
    res.send('404 Page not found');
});

io.on('connection', function (socket) {
    console.log('New user connected');
    connectionCount ++;
    io.emit('svrmsg', {name:"Message from the server", msg:"User connected - Connected users: " + connectionCount, trulyServer: true})
    socket.on('disconnect', function () {
        console.log('User disconnected');
        connectionCount --;
        io.emit('svrmsg', {name:"Message from the server", msg:"User disconnected - Connected users: " + connectionCount, trulyServer: true})
    });
    socket.on('chat message', function(msg){
        console.log(msg['name'] + ": " + msg['msg']);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('Server listening on *:3000');
});