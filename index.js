const _ = require('lodash')
const saveText2File = require('./saveFile');

var async  = require('async');
var crawlPage = require('./crawlPage');
var crawlPage2 = require('./crawlPage2');

const {Builder, until} = require('selenium-webdriver');

var t0;
var t1;


let driver = new Builder()
    .forBrowser('firefox')
    .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
    .build();

var uri ="https://batdongsan.com.vn"


var crawlType = async function(url,type){
    data = {}
    var result = type==1 ? await crawlPage(driver,until,url,undefined):await crawlPage2(driver,until,url,undefined)
    data = result.data;
    for(var i =2 ;i<=5;i++){
        url1 = url + "/p" + i
        var result = type==1 ? await crawlPage(driver,until,url1,true): await crawlPage2(driver,until,url1,true)
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
        data[type][ele.title] = await crawlType(uri+ele.link,1)
    }
    var type = "Nhà đất cho thuê"
    data[type]={};
    url2 = _.slice(url, 9, 17)
    for(var i =0 ;i<8;i++){
        ele = url2[i];
        data[type][ele.title] = {}
        data[type][ele.title] = await crawlType(uri+ele.link,1)
    }
    var type = "Nhà đất cần mua"
    data[type]={};
    var url2 = _.slice(url1, 0, 9)
    for(var i =0 ;i<9;i++){
        ele = url2[i];
        data[type][ele.title] = {}
        data[type][ele.title] = await crawlType(uri+ele.link,2)
    }
    var type = "Nhà đất cần thuê"
    data[type]={};
    url2 = _.slice(url1, 9, 17)
    for(var i =0 ;i<8;i++){
        ele = url2[i];
        data[type][ele.title] = {}
        data[type][ele.title] = await crawlType(uri+ele.link,2)
    }
    saveText2File(`./result/new_${Date.now()}.json`, JSON.stringify(data, null, "\t"));

    driver.quit();
    t1 = new Date().getTime();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}




var crawlHomePage = async (uri)=>{
    t0 = new Date().getTime();
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

