const express = require('express');
const {ServerConfig, DB} = require('./config')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',express.static(__dirname + '/public')) // works

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);

    // socket.on('from_client',()=>{
    //     console.log('message recieved from the client');
    // })
    
    // setInterval(()=>{
    //     socket.emit('from_server');
    // },4000)

    socket.on('new_msg',(data)=>{
        io.emit('msg_rcvd',data);
        // socket.emit('msg_rcvd',data);
        // socket.broadcast.emit('msg_rcvd',data);
    });

  socket.on('disconnect',()=>{
    console.log('user Disconnected ',socket.id);
  })
});

server.listen(ServerConfig.PORT,async()=>{
  console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
  await DB.DBconnect();
});