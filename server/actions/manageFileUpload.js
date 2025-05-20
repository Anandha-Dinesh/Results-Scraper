const fsExtra = require("fs-extra");
const xlsx = require("xlsx");
const scrape = require("./scrape");
const writedata = require("./writedata");
const formatDate = require("./formatDate");

const manageFiles = async (req, res) => {
  if (!req.files && !req.body.category) {
    res.status(404).json({ Message: "Pls give all inputs" });
  } else {
    let info = {
      file: req.files.foo,
      class: req.body.category,
    };

    await info.file.mv("./uploads/FILE.xlsx", (err) => {
      if (err) {
        console.log(err);
      } else {
        const workbook = xlsx.readFile(__dirname + "/../uploads/FILE.xlsx", {
          cellDates: true,
          dateNF: "dd/mm/yy",
        });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var sheet_name_list = workbook.SheetNames;

        let count = [];

        for (
          var sheetIndex = 0;
          sheetIndex < sheet_name_list.length;
          sheetIndex++
        ) {
          var worksheet_count = workbook.Sheets[sheet_name_list[sheetIndex]];
          var range = xlsx.utils.decode_range(worksheet_count["!ref"]);
          var num_rows = range.e.r - range.s.r + 1;
          count.push({
            data_count: num_rows,
          });
        }
        //console.log(count[0].data_count);
        let excel_dataarr = [];
        let dob, regno, ullasId;
        let flag = 1;

        (async () => {
          const recur = async () => {
            // count[0].data_count
            for (let i = 2; i <= 11; i++) {
              let regno_xl = worksheet[`A${i}`].v;
              let dob_xl = worksheet[`B${i}`].v;
              let ullasId_xl = worksheet[`C${i}`].v;

              if (regno_xl != undefined && dob_xl != undefined) {
                dob = await formatDate(dob_xl);
                regno = regno_xl.toString();
                ullasId = ullasId_xl.toString();

                if (regno.length === 7 && dob.length === 10) {
                  let data = await scrape(regno, dob, info.class);

                  let dataarr = await writedata(
                    data,
                    info.class,
                    regno,
                    dob,
                    ullasId
                  );
                  if (flag) {
                    if (info.class === "1") {
                      excel_dataarr.push([
                        "Register No",
                        "DOB",
                        "Ullas ID",
                        "Tamil",
                        "English",
                        "Maths",
                        "Science",
                        "Social",
                        "Total",
                      ]);
                    } else if (info.class === "2" || "3") {
                      excel_dataarr.push([
                        "Register No",
                        "DOB",
                        "Lang",
                        "Eng",
                        "Bio",
                        "CS",
                        "Phy",
                        "Che",
                        "Maths",
                        "Eco",
                        "Comm",
                        "Acc",
                        "BM",
                        "Total",
                      ]);
                    }
                    flag = 0;
                  }
                  excel_dataarr.push(dataarr);
                  console.log(`${i - 1} is DONE..`);
                } else {
                  let null_dataarr = await writedata(
                    "noData",
                    info.class,
                    regno,
                    dob
                  );
                  continue;
                }
              }
            }
          };
          await recur();

          var excelOutput = xlsx.utils.aoa_to_sheet(excel_dataarr);

          let OutputExcel = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(OutputExcel, excelOutput);
          xlsx.writeFile(OutputExcel, "Finaloutput.xlsx");
          console.log("DONE....");
          res.redirect("/Download");
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
};

module.exports = manageFiles;
