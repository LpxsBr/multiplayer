import express  from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();

const server = createServer(app);

app.use(express.static('public'))

const io = new Server(server)

io.on('connection', (socket)=>{
    console.log('user connected!')
    socket.on('user color', (msg)=>console.log('color: '+msg))
    socket.on('square_position', (text)=>{
        console.log(text)
        io.emit('square_position', text)
    })
})

server.listen(8888, (req, res)=>console.log('serving on 8888'));