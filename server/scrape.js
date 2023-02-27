

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
            
            // let source = await page.content("b",{"waitUntil": "domcontentloaded"})
            const elements = await page.$$("b");
            
            elements.forEach(async element => {
                const text = await (await element.getProperty("innerText")).jsonValue();
                console.log(await text)
                console.log( typeof text);
                
            });
            
            // await page.waitForTimeout(3000) // Wait for 3 seconds
            await browser.close() // Make sure to close the browser window
        }
        


        // const title = await page.evaluate{(el) => et.querySelector("h2 > a > span").textContent,producthandle}