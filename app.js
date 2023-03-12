// jshint everion-6
const express= require('express');
const app= express();
const http=require('http').createServer(app);
const PORT=process.env.PORT || 3000;
app.use(express.static("public"));
http.listen(PORT,function(){
    console.log('server started')
})
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
})

const io= require("socket.io")(http,{
    cors:{
        origin:"*"
    }
})
const user ={};
io.on('connection',(socket)=>{
      console.log("connected..")
      socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
      })
    });
    