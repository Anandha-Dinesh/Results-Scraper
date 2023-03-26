const fsExtra = require('fs-extra');
const xlsx = require("xlsx");
const scrape = require("./scrape");
const writedata = require("./writedata");

const manageFiles = async(req,res)=>{
    if (!req.files) {
        res.send("No file found")
    }else{
        var FILE = req.files.foo;
        
        await FILE.mv("./uploads/FILE.xlsx",(err)=>{
            if(err){
                console.log(err);
            }
            else{
                
                //console.log("Check the Uploads folder in"+__dirname+"/../uploads/FILE.xlsx" );
                const workbook = xlsx.readFile(__dirname+"/../uploads/FILE.xlsx", {cellDates: true, dateNF:"dd/mm/yy"});
                const worksheet =workbook.Sheets[workbook.SheetNames[0]];

                var sheet_name_list = workbook.SheetNames;
                let count = [];
                for (var sheetIndex = 0; sheetIndex < sheet_name_list.length; sheetIndex++) {
                    var worksheet_count = workbook.Sheets[sheet_name_list[sheetIndex]];
                    var range = xlsx.utils.decode_range(worksheet_count['!ref']);
                    var num_rows = range.e.r - range.s.r + 1;

                    count.push({
                        data_count: num_rows
                    });
                };
                
                let excel_dataarr =[];
                ( async () => {
                const recur = async () => {
                    for (let i = 2; i <= count[0].data_count; i++) {
                        let regno_xl = worksheet[`A${i}`].v;
                        let dob_xl = worksheet[`B${i}`].v;
                        const dob_init = new Date(dob_xl.setHours(dob_xl.getHours() + 24, 0, 0, 0));
                        const yyyy = dob_init.getFullYear();
                        let mm = dob_init.getMonth() + 1;
                        let dd = dob_init.getDate();
                        if (dd < 10) dd = '0' + dd;
                        if (mm < 10) mm = '0' + mm;  
                        const dob = dd + '/' + mm + '/' + yyyy;
                        let regno = regno_xl.toString()
                        
                        let data = await scrape(regno, dob);
                        let dataarr = await writedata(data);
                        excel_dataarr.push(dataarr);
                        
                    }
                }
                await recur()
                var excelOutput = xlsx.utils.aoa_to_sheet(excel_dataarr)
                console.log(excelOutput);
                let OutputExcel = xlsx.utils.book_new()
                xlsx.utils.book_append_sheet(OutputExcel, excelOutput);
                xlsx.writeFile(OutputExcel,"Finaloutput.xlsx")
                
                })();
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