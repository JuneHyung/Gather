const express = require('express');
const app = express();
const server = require('http').createServer(app)
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})

io.on('connection', socket=>{
  socket.on('message', ({name, message}) =>{
    console.log(`${name} : ${message}`)
    io.emit('message', ({name, message}))
  })
})

server.listen(5000, function(){
  console.log('listen on port 5000' )
})