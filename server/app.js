const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileupload= require("express-fileupload")
const xlsx = require("xlsx");

const manageFiles = require("./actions/manageFileUpload");
const PORT = 4000;

app.use(fileupload()); 

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

const file = require("./actions/manageFileUpload")
app.post("/",manageFiles)



app.listen(PORT,() =>{
    console.log("server is running....");
})