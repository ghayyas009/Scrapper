
const puppeteer = require("puppeteer");
const xlsx = require("xlsx");




//Scrape from Ebay function
async function scrapeEbay(url){
    let combine

    let ebayUrl = `https://www.ebay.com/`
    let ebayUrlWithSearch = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=${url}&_sacat=0`

    console.log(ebayUrl, "from ebay img")
    console.log(ebayUrlWithSearch, "from ebay img")


    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(ebayUrl)

    //input field and search button
    await page.type('#gh-ac', `${url}`)
    await page.click('.gh-spr')
    const secondToWait = (Math.floor(Math.random() * 2) + 1 ) * 1000
    await page.waitForTimeout(secondToWait);

    // await page.waitForTimeout(2500);
   

    //get images
    const ebayImg = await page.$$eval('.s-item__image-wrapper' , ebayImg => ebayImg.splice(0,1000).map((inr,i) => 
    inr.querySelector('img').getAttribute('src')
    ))
    console.log(ebayImg, "EBAYIMG")

    //get description
    const lineDesc = await page.$$eval('.s-item__title--has-tags' , desc => desc.splice(0,1000).map((inr,i) => 
            inr.innerText
    ))
    console.log(lineDesc)

    //get price
    const linePrice = await page.$$eval('.s-item__price' , desc => desc.map((inr,i) => 
        inr.innerText
    ))
    let parsePrice = linePrice.map(el => parseInt(el))
    console.log(linePrice)


    combine = [ebayImg,lineDesc, linePrice]
    const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(combine);
xlsx.utils.book_append_sheet(wb,ws);
xlsx.writeFile(wb,"items.xlsx")
// await browser.close();
  console.log('Done')
    // browser.close();

    return combine
}

scrapeEbay();
