document.addEventListener('DOMContentLoaded',()=>{
    console.log('js file connected');

    var socket = io();

    
    // const btn = document.getElementById('btn');
    // btn.addEventListener('click',()=>{
    //     socket.emit('from_client')
    // })

    // socket.on('from_server',()=>{
    //     let div = document.getElementById('from_server');
    //     let p = document.createElement('p');
    //     p.textContent = 'Received an event from the server ';
    //     div.appendChild(p);
    // })
    let input = document.getElementById('chat_box');
    let btn = document.getElementById('send');
    let msgList = document.getElementById('msg_list');
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
});

