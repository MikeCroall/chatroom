$('#messages').css('margin-bottom', $('#frm').height() + 2);

var socket = io();
$('form').submit(function () {
    var username = $('#n').val();
    if (!/\S/.test(username)) {
        username = "anon";
        $('#n').val(username);
    }
    if (username.length > 30){
        username = username.substring(0, 30);
        $('#n').val(username);
    }
    socket.emit('chat message', { name: username, msg: $('#m').val() });
    $('#m').val('');
    return false;
});
socket.on('server message', function(msg) {
    var div = $('<div>');
    var nameDiv = $('<div>').text(msg['name']);
    nameDiv.addClass("servername");
    var msgDiv = $('<div>').text(msg['msg']);
    div.append(nameDiv).append(msgDiv);
    var listItem = $('<li>').append(div);
    listItem.addClass("serverListItem");
    $('#messages').append(listItem);
    window.scrollTo(0, document.body.scrollHeight);
});
socket.on('chat message', function (msg) {
    var div = $('<div>');
    var nameDiv = $('<div>').text(msg['name']);
    nameDiv.addClass("username");
    var msgDiv = $('<div>').text(msg['msg']);
    div.append(nameDiv).append(msgDiv);
    var listItem = $('<li>').append(div);
    $('#messages').append(listItem);
    window.scrollTo(0, document.body.scrollHeight);
});
