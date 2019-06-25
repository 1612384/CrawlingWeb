const _ = require('lodash')
const saveText2File = require('./saveFile');

var async  = require('async');
var crawlPage = require('./crawlPage');

const {Builder, until} = require('selenium-webdriver');


let driver = new Builder()
    .forBrowser('firefox')
    .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
    .build();

var uri ="https://batdongsan.com.vn"


var crawlType = async function(url){
    data = {}
    var result = await crawlPage(driver,until,url,undefined)
    data = result.data;
    for(var i =2 ;i<=5;i++){
        url1 = url + "/p" + i
        var result = await crawlPage(driver,until,url1,true)
        data = result.data;
        if(result.count == 0)
            return data;
    }
    return data;
}

//crawl nha dat ban
var crawl = async function(url,url1){
    var data = {};
    var type = "Nhà đất bán"
    data[type]={};
    var url2 = _.slice(url, 0, 9)
    for(var i =0 ;i<9;i++){
        ele = url2[i];
        data[type][ele.title] = {}
        data[type][ele.title] = await crawlType(uri+ele.link)
    }
    var type = "Nhà đất cho thuê"
    data[type]={};
    url2 = _.slice(url, 9, 17)
    for(var i =0 ;i<8;i++){
        ele = url2[i];
        data[type][ele.title] = {}
        data[type][ele.title] = await crawlType(uri+ele.link)
    }
    var type = "Nhà đất cần mua"
    data[type]={};
    var url2 = _.slice(url1, 0, 9)
    for(var i =0 ;i<9;i++){
        ele = url2[i];
        data[type][ele.title] = {}
        data[type][ele.title] = await crawlType(uri+ele.link)
    }
    var type = "Nhà đất cần thuê"
    data[type]={};
    url2 = _.slice(url1, 9, 17)
    for(var i =0 ;i<8;i++){
        ele = url2[i];
        data[type][ele.title] = {}
        data[type][ele.title] = await crawlType(uri+ele.link)
    }
    saveText2File(`./result/new_${Date.now()}.json`, JSON.stringify(data, null, "\t"));

    driver.quit();
}




var crawlHomePage = async (uri)=>{
    console.log(uri);
    await driver.get(uri)
    var source = await driver.getPageSource()
    const $ = require('cheerio').load(source);
    url  = getURLElenments($).map(ele=>extractLink(ele));
    url2  = getURLElenments2($).map(ele=>extractLink(ele));
    crawl(url,url2);
}
const getURLElenments= ($) => {
    let urlEles = [];
    _.each($('.lv1'),ele => {
        urlEles.push($(ele));
    });
    return urlEles;
};
const getURLElenments2= ($) => {
    let urlEles = [];
    _.each($('.lv2'),ele => {
        urlEles.push($(ele));
    });
    return urlEles;
};
var extractLink = ($) => {
    let title = $.find('>a').text();
    let link = $.find('>a').attr('href');
    return {
        title,
        link,
    };
}

crawlHomePage(uri);

