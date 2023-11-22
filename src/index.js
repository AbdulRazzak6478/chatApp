const express = require('express');
// const {ServerConfig, DB} = require('./config')
const app = express();
const http = require('http');
const server = http.createServer(app);
// const  {Server}  = require("socket.io");
// const io = new Server(server);
const  Server  = require("socket.io");
// const Group = require('./models/group');
// const Chat = require('./models/chat');
path = require('path');
const cors = require('cors');


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.set('view engine','ejs');

// const io = new Server(server,{
//   cors:{
//     origin : 'http://localhost:5173/',
//     credentials:true
//   }
// });
const io = Server(server);

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  // global.chatSocket = socket
  console.log('a user connected',socket.id);

  // socket.on('join_room',(data)=>{
  //   console.log('joining room ',data.roomid);
  //   socket.join(data.roomid);
  // })
  socket.on('hello',(arg)=>{
    console.log('from client',arg);
  })
  socket.emit('world','hello');
  // socket.on('new_msg',async (data)=>{
  //   console.log('new message',data);
  //   // const chat = await Chat.create({
  //   //   content:data.message,
  //   // sender:data.sender,
  //   // roomid:data.roomid
  //   // });
  //     io.to(data.roomid).emit('msg_rcvd',data);
  // });

  socket.on('disconnect',()=>{
    console.log('user Disconnected ',socket.id);
  })
});

app.get('/', async (req, res)=>{
  console.log('group page rendered');
  // res.render('index')
  res.json({
    message : "OK"
  })
})
// app.get('/group', async (req, res)=>{
//   console.log('group page rendered');
//   res.render('group')
// })

const PORT = 3000
server.listen(PORT,async()=>{
  console.log(`Successfully started the server on PORT ${PORT} `);
  // await DB.DBconnect();
});

