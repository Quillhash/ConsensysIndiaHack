var express = require('express');
var app = express();
var path = require('path')
var port= 3000 || process.env.port
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname +'/index.html'));

})

app.listen(port,()=>{
    console.log("listening");
})