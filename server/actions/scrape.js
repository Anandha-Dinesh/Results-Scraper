const puppeteer = require("puppeteer");

const scrape = async (regno, dob, category) => {
  try {
    let browser;
    if (!browser)
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });
    const page = await browser.newPage();
    // page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        req.resourceType() === "stylesheet" ||
        req.resourceType() === "font" ||
        req.resourceType() === "image"
        // req.resourceType() === "script"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    if (category == 1) {
      await page.goto("https://tnresults.nic.in/rdclex.htm", {
        waitUntil: ["networkidle2"],
      });
    }
    if (category == 2) {
      await page.goto("https://tnresults.nic.in/acpqrfy.htm", {
        waitUntil: ["networkidle2"],
      });
    }
    if (category == 3) {
      await page.goto("https://tnresults.nic.in/tpexter.htm", {
        waitUntil: ["networkidle2"],
      });
    }

    await page.waitForSelector("#regno");
    await page.waitForSelector("#dob");
    await page.waitForSelector("input[type=submit]");

    await page.type("#regno", regno);
    await page.type("#dob", dob);
    await page.click("input[type=submit]");

    await page.waitForNavigation({
      waitUntil: "networkidle0",
    });
    // await page.waitForResponse(async(response)=>{
    //     if(response.url() === "https://tnresults.nic.in/tpexter.asp" && response.status()===200){
    // page.on("request", (interceptedRequest) => {
    // 	// Check the URL or content type to detect a download request
    // 	if (interceptedRequest.url().endsWith(".asp")) {
    // 		// Handle the download here..
    // 	}
    // 	interceptedRequest.continue();
    // });
    const elements = await page.$$("b");
    const dataarr = await Promise.all(
      elements
        .filter(async (element) => {
          if (element.length == 0) {
            return true;
          }
          return false;
        })
        .map(async (element) => {
          const text = await (
            await element.getProperty("innerText")
          ).jsonValue();
          return text.trim();
        })
    );
    Promise.all(dataarr).then(function () {
      console.log(dataarr);
      return dataarr;
    });
    await browser.close();
    return dataarr;
    // }
    // else{
    //     await browser.close();
    //     await scrape(regno,dob);
    // }
    // } );
  } catch (e) {
    console.log("Error on " + regno);
  }
};

module.exports = scrape;
