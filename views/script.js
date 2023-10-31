console.log('js file connected');

    var socket = io();
    let input = document.getElementById('chat_box');
    let btn = document.getElementById('send');
    let msgList = document.getElementById('msg_list');
    // whenever we render the page we join room
    socket.emit('join_room',{
        roomid:'<%= roomid %>'
    });
    btn.addEventListener('click',()=>{
        let msg = input.value;
        socket.emit('new_msg',{
            message:msg
        });
        input.value = '';
    });
    socket.on('msg_rcvd',(data)=>{
        let li = document.createElement('li');
        li.textContent = data.message;
        msgList.appendChild(li);
    })