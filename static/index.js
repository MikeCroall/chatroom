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
socket.on('svrmsg', function (msg) {
   $('#messages'.append(msg)); 
});
socket.on('chat message', function (msg) {
    var div = $('<div>');
    var nameDiv = $('<div>').text(msg['name']);
    var server = false;
    try{
        if (msg['name'] == "Message from the server"){
            if(msg['trulyServer']){
                server = true;
            }
        }
    } catch(ex) {}
    nameDiv.addClass(server ? "servername" : "username");
    var msgDiv = $('<div>').text(msg['msg']);
    div.append(nameDiv).append(msgDiv);
    var listItem = $('<li>').append(div);
    if(server){
        listItem.addClass("serverListItem");
    }
    $('#messages').append(listItem);
    window.scrollTo(0, document.body.scrollHeight);
});
