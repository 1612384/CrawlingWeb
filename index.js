const _ = require('lodash')

const {Builder, until} = require('selenium-webdriver');

const fs = require('fs');
let driver = new Builder()
    .forBrowser('firefox')
    .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
    .build();

let url = "https://batdongsan.com.vn/nha-dat-ban";





var crawl = (url)=>{
    console.log(url)
    driver.get(url)
        .then(() => driver.getPageSource())
        .then((source) => {
            const $ = require('cheerio').load(source);
            let news = getNewsElements($).map(ele => extractProductInfo(ele));
            saveText2File(`./result/new_${Date.now()}.json`, JSON.stringify(news));
            })
        .then(() => {
        driver.quit();
    });
}
var crawlWeb=async (pageLoad)=>{
    const result = await Promise.all(pageLoad.map(uri => crawlPage(uri)))
}
const getNewsElements= ($) => {
    let newsEles = [];
    $('.vip0').each((_, ele) => {
        newsEles.push($(ele));
    });
    return newsEles;
};

const extractProductInfo = ($) => {
    let title = $.find('.p-title >h3 >a').text();
    let thumbnail = $.find('.p-main .p-main-image-crop .product-avatar >img').attr('src');
    let content = $.find('.p-main .p-content .p-main-text').text();
    let price = $.find('.p-main .p-bottom-crop .floatleft .product-price').text();
    let area = $.find('.p-main .p-bottom-crop .floatleft .product-area').text();
    let city_dist = $.find('.p-main .p-bottom-crop .floatleft .product-city-dist').text();
    let date = $.find('.p-main .p-bottom-crop .floatright >span').text();
    return {
        title ,
        thumbnail,
        content,
        price,
        area,
        city_dist,
        date
    };
};

const saveText2File = (filepath, text) => {
    fs.writeFile(filepath, text, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
};


var pageLoad = [url];
for(var i = 2;i<=10;i++){
    pageLoad.push(`${url}/p${i}`)
}

//crawlWeb(pageLoad)
crawl(url);

