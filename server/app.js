// const f= require("./scrape") 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const PORT = 4000;

app.use(fileupload()); 

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/', function(req, res) {
    console.log(req.files.foo); 
  });



app.listen(PORT,() =>{
    console.log("server is running....");
})