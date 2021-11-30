import puppeteer from 'puppeteer';

async function scrape(url: string) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(url)

    let element = await page.evaluate(() => {
        let links = Object.values(document.body.querySelectorAll('a.name')).map((x:any) => {
            return x.href
        })
        return {
            title: document.querySelector('.product-details-name') ? document.querySelector('.product-details-name').textContent : null,
            price: document.querySelector('.price-colour-final-pdp') ? document.querySelector('.price-colour-final-pdp').textContent : null,
            related: links
        }
    });

    await browser.close()

    // logging results
    if(element) {
        if(element.title) console.log(element)
        if(element.related) {
            for (const link of element.related) {
                await scrape(link)
            }
        }
    }
}

scrape('https://www.chedraui.com.mx/Departamentos/Súper/c/MC61?q=%3Arelevance&page=0&pageSize=24')