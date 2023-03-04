const puppeteer = require("puppeteer")

        const scrape = async () => {

            const browser = await puppeteer.launch({
                headless: true 
            })

            const page = await browser.newPage()
            
            await page.goto("https://tnresults.nic.in/acpter.htm")
            await page.waitForSelector("#regno")
            await page.type("#regno","5802228")
            await page.type("#dob","04/11/2004")
            await page.click('input[type=submit]')
            
            var dataarray=new Array();
            // let source = await page.content("b",{"waitUntil": "domcontentloaded"})
            const elements = await page.$$("b");
           
            const dataarr = await Promise.all(elements.filter(async(element) =>{
                if (element == '') {
                    return true;
                }
                return false;
            }) .map(async(element)=>{
                const text = await (await element.getProperty("innerText")).jsonValue();
                    return text;
            }
            
            ));
             Promise.all(dataarr).then(function() { console.log(dataarr) })
                
            
            
            
            // await page.waitForTimeout(3000) // Wait for 3 seconds
            await browser.close() // Make sure to close the browser window
        }
        
        scrape();


            //  elements.forEach(async element => {
            //     const text = await (await element.getProperty("innerText")).jsonValue();
            //     dataarr.push(await text)
            //     // console.log(dataarr.length);
            //     return dataarr;
            // })