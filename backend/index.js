const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(cors());
const auth = require('./services/auth');
const online = require('./services/online');

mongoose.connect('mongodb+srv://tal865DB:ed8SDS5J7PX5WBi@cluster0.l46vcak.mongodb.net/?retryWrites=true&w=majority', {})
    .then(() => console.log('connection succesful'))
    .catch((error) => {
        console.log('error has accured!');
        console.log(error);
    })

    const io = require('socket.io')(2000, {
        cors: {
            origin: ['http://localhost:3000']
        }
    });
    
    io.on('connection', (socket) => {
        console.log(socket.id, 'connected');
    
        socket.on('send message', (message, sentBy, room) => {
            console.log(message);
            console.log(room);
            if (room === 'global') {
                console.log("the room " ,room);
                socket.broadcast.emit("recieve-message", message, sentBy);
            } else {
                socket.to(room).emit("recieve-message", message, sentBy);
            }
        })
    
        socket.on('join room', (room) => {
            socket.join(room);
        });
    
    });


app.use(express.json());
app.post('/setOnline', online.setOnline);
app.post('/setOffline', online.setOffline);
app.post('/whoIsOnline', online.whoIsOnline);
app.post('/register', auth.register);
app.post('/login', auth.login);
app.listen(4001, () => console.log('port 4001 is on'));