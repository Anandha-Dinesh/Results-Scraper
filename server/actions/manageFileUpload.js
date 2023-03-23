const fsExtra = require('fs-extra');
const xlsx = require("xlsx");
const scrape = require("./scrape");
const writedata = require("./writedata");

const manageFiles = async(req,res)=>{
    if (!req.files) {
        res.send("No file found")
    }else{
        var FILE = req.files.foo;
        
        await FILE.mv(__dirname+"/../uploads/FILE.xlsx",(err)=>{
            if(err){
                console.log(err);
            }
            else{

                //console.log("Check the Uploads folder in"+__dirname+"/../uploads/FILE.xlsx" );
                const workbook = xlsx.readFile(__dirname+"/../uploads/FILE.xlsx");
                const worksheet =workbook.Sheets[workbook.SheetNames[0]];
                const recur = async () =>{
                    for (let i =2;i<6;i++){
                        const regno =  worksheet[`A${i}`].v;
                        const dob = worksheet[`B${i}`].v;
                        let data = await scrape(regno , dob);
                        await writedata(data)
                    }
                }
                recur();


                // fsExtra.emptyDir(__dirname+"/../uploads/",(err)=>{
                //     if(err){
                //         console.log(err);
                //     }
                //     else{
                //         console.log("File deleted");
                //     }
                // });
            }
        });      
    }
}

module.exports = manageFiles;