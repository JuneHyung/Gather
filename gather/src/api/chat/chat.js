import {io} from 'socket.io-client';

export let socket = io.connect("http://localhost:5000");
export const initSocketConnection = () =>{
  if(socket) return;
  socket.connect();
}

export const disconnectSocket = () =>{
  if(socket ===null || socket.connected===false)return;
  socket.disconnect();
  // socket = null;
}