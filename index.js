const express = require('express');
const http  = require('http');
const cors = require('cors');
const {Server} = require('socket.io')
//from imported packge will import all the needed things

const app = express()
app.use(cors());
//to allow our browser to allow us to do some functionality will use cors
const server = http.createServer(app);
//will start adding cors into our server object
const io = new Server(server,{
    cors: {
        origin:"http://localhost:3002",
        methods:["GET","POST"]
    }
})
//will pass all the necessary action that will do on server (saying browser that will do get and post)

io.on("connection",(socket)=>{
    console.log("user connected",socket.id); 
    //on connect event any service this will emit this console
    socket.on("jon_room",(data)=>{
        socket.join(data);
        console.log(`user join the room: ${data} , with userId :${socket.id}`)
    })

    socket.on("send_data",(data)=>{
        console.log("received data",data)
        socket.to(data.room).emit("recived_message",data)
    })


    // custom event created


    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        //on disconnect event any service this will emit this console
    })
})

//created a event call on(connection and disconnect) connect of io socket , when  connect give console "user conneceted"  




server.listen(3001,()=>{
    console.log("listening on port");
})

//created server on 3001 1 port