import puppeteer, { Page } from 'puppeteer';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Este codigo es dedicado para mi bella novia Nianita Anina
async function scrapeOne(page: Page, url: string) {
    await sleep(1500);
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

    return element
}

async function scrape(url: string) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    let element = await scrapeOne(page, url)
    //guardar
    console.log(element.title)

    // logging results
    if(element) {
        if(element.related) {
            for (const link of element.related) {
                let element = await scrapeOne(page, link)
                //guardar
                console.log(element.title)
            }
        }
    }

    await browser.close()
}

scrape('https://www.chedraui.com.mx/Departamentos/Súper/c/MC61?q=%3Arelevance%3Acategory_l_2%3AMC2507&text=#')