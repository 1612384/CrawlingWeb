const _ = require('lodash')
const saveText2File = require('./saveFile');
var driver = require('./buildDriver');

let uri = "https://batdongsan.com.vn/";

var crawlHomePage = (uri)=>{
    console.log(uri)
    driver.get(uri)
        .then(() => driver.getPageSource())
        .then((source) => {
            const $ = require('cheerio').load(source);
            let uri  = getURLElenments($).map(ele=>extractLink(ele))
            saveText2File(`./result/new_${Date.now()}.json`, JSON.stringify(uri));
            crawlPage(uri[0]);
            })
        .then(() => {
        driver.quit();
    });
}

var getURLElenments= ($)=>{
    let urlEles = [];
    _.each($('.lv0'),ele => {s
        urlEles.push($(ele));
    });
    return urlEles;
}
var extractLink = ($)=>{
    let title = $.find('>a').text();
    let link = $.find('>a').attr('href');
    return {
        title,
        link,
    };
}



crawlHomePage(uri);