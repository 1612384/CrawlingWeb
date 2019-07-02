var fetchUrl = require('fetch').fetchUrl;
var cheerio = require('cheerio');
var URL = require('url-parse');
var _ = require('lodash');
var async = require('async');
var afterLoad = require('after-load');


var START_URL = "https://batdongsan.com.vn/";
var count = 0;
var pagesVisited = {};
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;
pagesToVisit.push(START_URL);
crawl();

function crawl() {
    if(pagesToVisit.length == 0) {
        console.log(count);
    return;
}
async.mapLimit(pagesToVisit,1000,ele=>{
        var nextPage = pagesToVisit.pop();
        visitPage(nextPage, crawl);
    })
}

function visitPage(url, callback) {
    count++;
    console.log("Visiting page " + url);
    var html = afterLoad(url)
    var $ = cheerio.load(html);
    collectInternalLinks($);
    callback();
}

function collectInternalLinks($) {
    // Add page to our set
    pagesVisited[url] = $("Title").text();
    var relativeLinks = $("a[href^='/']");
    _.each(relativeLinks,ele => {
        if(!pagesVisited[baseUrl + $(ele).attr('href')] && $(ele).attr('href') != "/english" && $(ele).attr('href').indexOf("hd") == -1) { 
            // if($(ele).attr('href').split("/").length-1 == 1|| $(ele).attr('href') == "https://batdongsan.com.vn/"){
                if(pagesToVisit.indexOf(baseUrl + $(ele).attr('href'))==-1 && $(ele).attr('href').indexOf("ban-do") == -1 && $(ele).attr('href').indexOf("bang") != -1){
                    pagesToVisit.push(baseUrl + $(ele).attr('href'));
                } 
            //}
        }
    });
}

