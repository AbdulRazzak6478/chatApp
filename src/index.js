const express = require('express');
const {ServerConfig, DB} = require('./config')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
path = require('path');
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);

  socket.on('join_room',(data)=>{
    console.log('joining room ',data.roomid);
    socket.join(data.roomid);
  })

  socket.on('new_msg',(data)=>{
    console.log('new message',data);
      io.to(data.roomid).emit('msg_rcvd',data);
  });

  socket.on('disconnect',()=>{
    console.log('user Disconnected ',socket.id);
  })
});

app.get('/chat/:roomid/:user',async (req, res) =>{
  res.render('index',{roomid: req.params.roomid,user : req.params.user})
});

server.listen(ServerConfig.PORT,async()=>{
  console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
  await DB.DBconnect();
});