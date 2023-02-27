const puppeteer = require("puppeteer")
const f= require("./scrape") 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const PORT = 4000;


app.post("/",(req,res) => {
    
});



app.listen(PORT,() =>{
    console.log("server is running....");
})