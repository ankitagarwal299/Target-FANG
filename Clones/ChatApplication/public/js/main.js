const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

//Message from server
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);
    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit
chatForm.addEventListener('submit',function(e){
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;
    console.log(msg);

    //Emit message to server
    socket.emit('chatMessage', msg);

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = 
    `<p class="meta">Brad 
        <span>9:12pm</span>
    </p>
    <p class="text">${message}</p>`;

    document.querySelector('.chat-messages').appendChild(div);
}