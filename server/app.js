const express = require("express");
const app = express();
const fileupload= require("express-fileupload")
app.use(express.static("Public"))

const manageFiles = require("./actions/manageFileUpload");
const PORT = 4000;

app.use(fileupload()); 


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/Public/index.html");
});

app.post("/",manageFiles);


app.listen(PORT,() =>{
    console.log(`server is running at port ${PORT}.... `);
})