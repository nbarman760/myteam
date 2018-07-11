let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var users = [];
io.on('connection', (socket) => {
  console.log();
  socket.on('disconnect', function(){
     io.emit('users-changed', {user: socket.nickname, event: 'left'});
  });

  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    users.push(nickname);
    console.log(nickname);
    console.log(users);
    io.emit('users-changed', {user: nickname, event: 'joined'});
  });

  socket.on('getuser', (data)=>{
      io.emit('users', {user: users });
  });

  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
  });
});

var port = process.env.PORT || 3001;

http.listen(port, function(){
   console.log('listening in http://192.168.1.203:' + port);
});
