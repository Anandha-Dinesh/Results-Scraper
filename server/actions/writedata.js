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



const writedata = (data,category,regno,dob) =>{
     
    if(category=="2" || "3"){
        if(data[29]=="COMPUTER SCIENCE"){
            let cs_mark= [
                regno,
                dob,
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
            return cs_mark;
        }
    
        if(data[29]=="BIOLOGY"){
            let bio_mark=[
                regno,
                dob,
                data[10],
                data[15],
                data[21],
                data[27],
                data[32],
                data[38],
            ]
            return bio_mark;
        }

        if(data[29]=="ACCOUNTANCY"){
            let com_mark=[
                regno,
                dob,
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
            return com_mark;
        }

        if (data=="noData") {
            let fillNull =[
                regno,
                dob,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
            ]
            return fillNull;
        }
    }

    if (category=="1") {
            var sslc_mark=[
                regno,
                dob,
                data[10],
                data[15],
                data[21],
                data[27],
                data[32],
            ]
            return  sslc_mark;
    }
}
module.exports = writedata;
