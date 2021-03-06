var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var connectionCount = 0;
function craftServerListItem(message){
    var div = $('<div>');
    var nameDiv = $('<div>').text("Message from the server").addClass("servername");
    var msgDiv = $('<div>').text(message);
    div.append(nameDiv).append(msgDiv);
    return $('<li>').append(div).addClass("serverListItem");
}

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
    io.emit('server message', {name:"Message from the server", msg:"User connected - Connected users: " + connectionCount})
    socket.on('disconnect', function () {
        console.log('User disconnected');
        connectionCount --;
        io.emit('server message', {name:"Message from the server", msg:"User disconnected - Connected users: " + connectionCount})
    });
    socket.on('chat message', function(msg){
        console.log(msg['name'] + ": " + msg['msg']);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('Server listening on *:3000');
});
