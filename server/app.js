// const f= require("./scrape") 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileupload= require("express-fileupload")
const xlsx = require("xlsx");
const fsExtra = require('fs-extra');
const PORT = 4000;

app.use(fileupload()); 

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/', function(req, res) {
    if (!req.files) {
        res.send("No file found")
    }else{
        var FILE = req.files.foo;
        
        FILE.mv(`${__dirname}/uploads/FILE.xlsx`,(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Check the Uploads folder");
                fsExtra.emptyDir(__dirname+"/uploads/",(err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("File deleted");
                    }
                });
            }
        });
        
        
    }
  });



app.listen(PORT,() =>{
    console.log("server is running....");
})