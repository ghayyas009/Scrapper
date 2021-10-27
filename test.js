const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // for ebay link
  await page.goto("https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=bages&_sacat=0")
// for other practice site link
  // await   page.goto("https://learnwebcode.github.io/practice-requests/")
  // for daraz link
// await   page.goto("https://www.daraz.pk/groceries-laundry-household-paper/?spm=a2a0e.home.cate_6_6.6.35e34937hkur6g")
 
  // for daraz images
  // const photos = await page.$$eval(".c5TXIP .cRjKsc .c1ZEkM", imgs => {
  //   return imgs.map(x => x.src)
  // })
  // const photos = await page.$$eval("img", imgs => {
  //   return imgs.map(x => x.src)
  // })

  // for (const photo of photos) {
  //   const imagepage = await page.goto(photo)
  //   await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
  // }

  const photos = await page.$$eval('.s-item__image-wrapper' , ebayImg => ebayImg.splice(0,64).map((inr,i) => 
  inr.querySelector('img').getAttribute('src')
  
  ))



for(const photo of photos){
   const imagepage =  await page.goto(photo)
   await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())

}



  await browser.close()
}

start()