const express = require('express')
const app = express()
const path = require('path')



app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/images'));
app.listen(3000, ()=>{
   
   console.log("HI");
});