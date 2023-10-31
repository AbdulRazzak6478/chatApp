const express = require('express');
const {ServerConfig, DB} = require('./config')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Group = require('./models/group');
const Chat = require('./models/chat');
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

  socket.on('new_msg',async (data)=>{
    console.log('new message',data);
    const chat = await Chat.create({
      content:data.message,
    sender:data.sender,
    roomid:data.roomid
    });
      io.to(data.roomid).emit('msg_rcvd',data);
  });

  socket.on('disconnect',()=>{
    console.log('user Disconnected ',socket.id);
  })
});

app.get('/group', async (req, res)=>{
  console.log('group page rendered');
  res.render('group')
})
app.post('/group', async (req, res)=>{
  console.log('req body of group ',req.body);
  await Group.create({
    name:req.body.name
  });
  res.redirect('/group');
})

app.get('/chat/:roomid/:user',async (req, res) =>{
  const group = await Group.findById(req.params.roomid);
  console.log('group details :',group);
  const chats = await Chat.find({
    roomid:req.params.roomid
  });
  console.log('all chats : ',chats);
  res.render('index',{
    roomid: req.params.roomid,
    user : req.params.user,
    groupName :group.name,
    previousMsgs : chats
  })
});

server.listen(ServerConfig.PORT,async()=>{
  console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
  await DB.DBconnect();
});