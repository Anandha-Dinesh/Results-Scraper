const puppeteer = require("puppeteer");


const scrape =  
    async (regno,dob,category) => {
        const grade = {
            1:"https://tnresults.nic.in/arcxrs.htm",
            2:"https://tnresults.nic.in/acpqrfy.htm",
            3:"https://tnresults.nic.in/acpter.htm"
        }
        // switch zz(category) {
        //     case 1:
        //         URL="https://tnresults.nic.in/arcxrs.htm"
        //         break;
        //     case 2:
        //         URL="https://tnresults.nic.in/acpqrfy.htm"
        //         break;
        //     case 3:  
        //         URL="https://tnresults.nic.in/acpter.htm"
        //         break;
        // }
        let browser
        if(!browser) browser = await puppeteer.launch({
        headless: false 
        })
        const page = await browser.newPage()
        page.setJavaScriptEnabled(false)
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image' || req.resourceType() === "script"){
                req.abort();
            }
            else {
                req.continue();
            }
        });
            
        if(category==1){
            await page.goto("https://tnresults.nic.in/arcxrs.htm", { waitUntil: ['networkidle2'] })
        }
        if (category==2){
            await page.goto("https://tnresults.nic.in/acpqrfy.htm", { waitUntil: ['networkidle2'] })
        }
        if(category==3){
            await page.goto("https://tnresults.nic.in/acpter.htm", { waitUntil: ['networkidle2'] })
        }   

        await page.waitForSelector("#regno")
        await page.waitForSelector("#dob")
        await page.waitForSelector("input[type=submit")
                        
        await page.type("#regno",regno)
        await page.type("#dob",dob)
        await page.click('input[type=submit]')

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        const elements = await page.$$("b");
                        
        const dataarr = await Promise.all(elements.filter(async(element) =>{
            if (element.length == 0) {
                return true;
            }
            return false;
        }) 
        .map(async(element)=>{
            const text = await (await element.getProperty("innerText")).jsonValue();       
                return text.trim() ;
            }));
            Promise.all(dataarr)
                .then(function() {
                    console.log(dataarr);
                    return dataarr
                })
            return dataarr                          
}


module.exports=scrape;