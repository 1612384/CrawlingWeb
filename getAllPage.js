var fetchUrl = require("fetch").fetchUrl;
var cheerio = require('cheerio');
var URL = require('url-parse');
var _ = require('lodash');
var START_URL = "https://batdongsan.com.vn/";
var MAX_PAGES_TO_VISIT = 1000;
var async = require('async');

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;
var count  = 0 ;
pagesToVisit.push(START_URL);
crawl();

function crawl() {
    if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
        console.log("Reached max limit of number of pages to visit.");
        return;
    }
    var nextPage = pagesToVisit.pop();
    visitPage(nextPage, crawl);
}

function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    numPagesVisited++;

    // Make the request
    console.log("Visiting page " + url);
    fetchUrl(url, function(error, meta, body){
        // Parse the document body
        var $ = cheerio.load(body);
        if(url.includes("ban")) {
            console.log(++count);
        } 
            collectInternalLinks($);
            callback();
    });
}

function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    _.each(relativeLinks,ele => {
        if(!pagesVisited[baseUrl + $(ele).attr('href')]) { pagesToVisit.push(baseUrl + $(ele).attr('href')); }
    });
}
