const puppeteer = require("puppeteer");


const scrape =  
    async (regno,dob) => { 
     
        const browser = await puppeteer.launch({
        headless: false 
    })
    const page = await browser.newPage()
   
    await page.goto("https://tnresults.nic.in/acpter.htm")
    await page.waitForSelector("#regno")
    await page.type("#regno",regno)
    await page.type("#dob",dob)
    await page.click('input[type=submit]')
            
    const elements = await page.$$("b");
           
    const dataarr = await Promise.all(elements.filter(async(element) =>{
    if (element.length == 0) {
        return true;
    }
    return false;
    }) .map(async(element)=>{
            const text = await (await element.getProperty("innerText")).jsonValue();
            
            return text.trim() ;
            
            }
        ));
        Promise.all(dataarr)
            .then(function() {
                return dataarr
                })
            await browser.close();
            return dataarr
        
}
    
    


module.exports=scrape;


// let browser;
    // (async () => {
    //     if(!browser){
    //         browser = await puppeteer
    //         .launch({
    //             headless: true 
    //         })
    //         const page = await browser.newPage()
    //     }
    // })
    // const browser =  puppeteer;
    // if ((await browser.page()).length === 0) {
    //         browser.launch({
    //             headless: true 
    //         })
    //         const page = await browser.newPage()
    //   }