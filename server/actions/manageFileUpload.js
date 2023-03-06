const fsExtra = require('fs-extra');

const manageFiles=async(req,res)=>{
    if (!req.files) {
        res.send("No file found")
    }else{
        var FILE = req.files.foo;
        
        await FILE.mv(__dirname+"/uploads/FILE.xlsx",(err)=>{
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
}

module.exports = manageFiles;