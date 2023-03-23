let datas =[
    'ANITHA J    ( 5802220 )',
    'Subject',
    'int',
    'Theory',
    'Pra',
    'Total',
    'Pass',
    'LANGUAGE',
    '010',
    '082',
    '092',
    'P',
    'ENGLISH',
    '010',
    '048',
    '058',
    'P',
    'ECONOMICS',
    '010',
    '038',
    '',
    '048',
    'P',
    'COMMERCE',
    '010',
    '061',
    '',
    '071',
    'P',
    'ACCOUNTANCY',
    '010',
    '069',
    '',
    '079',
    'P',
    'BUSINESS MATHS & STA',
    '010',
    '062',
    '',
    '072',
    'P',
    'TOTAL',
    '0420',
    'PASS'
  ]
  
const { writeXLSX } = require("xlsx");
const objects= require("./objects");



const writedata = async(data) =>{
    var excelarray=[];
    // if (_)     
    
    // {
          
    
    
    
    if(data[29]=="COMPUTER SCIENCE"){
            var cs_exceldata=[
            data[10],
            data[15],
            "",
            data[32],
            data[21],
            data[27],
            data[38],
            "",
            "",
            "",
            "",
            ]
            excelarray.push(cs_exceldata);
        }
    
        if(data[29]=="BIOLOGY"){
            let bio_exceldata=[
            data[10],
            data[15],
            data[21],
            data[27],
            data[32],
            data[38],
            ]
            excelarray.push(bio_exceldata);
        }

        if(data[29]=="ACCOUNTANCY"){
            let com_exceldata=[
            data[10],
            data[15],
            "",
            "",
            "",
            "",
            "",
            data[21],
            data[27],
            data[33],
            data[39],
            data[42]
            ]
            excelarray.push(com_exceldata);
        }
    //};

    //if (_) {

            var sslc_exceldata=[
            data[10],
            data[15],
            data[21],
            data[27],
            data[32],
            ]
            excelarray.push(sslc_exceldata);
        
    // }
    console.log(excelarray);
}

writedata(datas);
