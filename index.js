const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 9000;
const mongoose = require('mongoose')
const Msg = require('./db/messages')
const ejs = require('ejs')
let helo = "hello!"
app.set('view engine','ejs')

app.get('/l', (req, res) => {
  Msg.find({})
});
app.get('/', (req, res) => {
  Msg.find({},(err,data)=>{
    res.render('ejs',{
      data : data
    })
  })
  .exec((err, data)=>{
      if(err){console.log(err)}
      else{
        res.json(data)
      }
  })
});


//const User = require('./db/user')
const mongodb = "mongodb+srv://geepesh_agrawal:geepeshagrawal@cluster0.n8viw.mongodb.net/message-database?retryWrites=true&w=majority"

mongoose.connect(mongodb).then(()=>{
  console.log('database connected!!!');
})

Msg.find({},(err,list)=>{
  if(err){console.log(err);}
  else{console.log(list)}
})

app.use(express.static(__dirname + "/db"))

io.on('connection', (socket) => {
  Msg.find().then((result)=>{
    socket.emit('outPutMsg',result)
  })
  //console.log('active')
  socket.on('disconnect',(socket)=>{
  //console.log('deactive')
 })
  socket.on('chat message', (msg,user) => {

    const message = new Msg({msg,user})
     message.save().then(()=>{
     io.emit('chat message', msg,user);
    })
  })
  /*socket.on('user', username => {

      io.emit('user', username);


  });*/
  socket.on('new-user-joined', newUser => {
    io.emit('new-user-joined', newUser);
  });


});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
