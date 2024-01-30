import express  from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const server = createServer(app);

app.use(express.static(__dirname+'/../public'))
// console.log(__dirname+'/../public');

app.get('/api/', (req, res)=>res.json('aeeeh'))

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