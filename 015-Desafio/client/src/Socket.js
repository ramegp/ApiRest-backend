import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
  socket = io('http://localhost:8080/');
  console.log(`Connecting socket...`);
  socket.on('msj-server',(data)=>{console.log(data)})
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}
export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
}