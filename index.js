const _ = require('lodash')
const saveText2File = require('./saveFile');

var async  = require('async');
var crawlPage = require('./crawlPage');
var crawlPage2 = require('./crawlPage2');
var afterLoad = require('after-load');
var fetchUrl = require("fetch").fetchUrl;

var t0;
var t1;


var uri ="https://batdongsan.com.vn"


var crawlType = function(title,url,type){
    data = {}
    page = [1,2,3,4,5];
    type == 1 ? crawlPage.setKind(title):crawlPage2.setKind(title);
    async.map(page, (ele,callback)=> {
        url1 = url + "/p" + ele;
        callback(null,type==1?crawlPage.crawl(title,url1):crawlPage2.crawl(title,url1));
    }, function(err, results) {
        data = results[4];
    });
    return data;
}

//crawl nha dat ban
var crawl = async function(url,url1){
    var data = {};
    async.parallelLimit({
        one: function(callback) {
            var type = "Nhà đất bán"
            var url2 = _.slice(url, 0, 9)
            crawlPage.resetData();
            async.mapLimit(url2,3,(ele,callback)=> {
                callback(null,crawlType(ele.title,uri+ele.link,1));
            }, function(err, results) {
                callback(err,type,results[8]);
            });
        },
        two: function(callback) {
            crawlPage.resetData();
            var type = "Nhà đất cho thuê"
            url2 = _.slice(url, 9, 17)
            async.mapLimit(url2,2, (ele,callback)=> {
                callback(null,crawlType(ele.title,uri+ele.link,1));
            }, function(err, results) {
                callback(err,type,results[7]);
            });
        },
        three: function(callback) {
            crawlPage2.resetData();
            var type = "Nhà đất cần mua"
            var url2 = _.slice(url1, 0, 9)
            async.mapLimit(url2,3,(ele,callback)=> {
                callback(null,crawlType(ele.title,uri+ele.link,2));
            }, function(err, results) {
                callback(err,type,results[8]);
            });
        },
        four: function(callback) {
            crawlPage2.resetData();
            var type = "Nhà đất cần thuê"
            url2 = _.slice(url1, 9, 17)
            async.mapLimit(url2,2,(ele,callback)=> {
                callback(null,crawlType(ele.title,uri+ele.link,2));
            }, function(err, results) {
                callback(err,type,results[7]);
            });
        }
    },4, function(err, results) {
        console.log(err);
        data[results.one[0]]={};
        data[results.one[0]]=results.one[1];
        data[results.two[0]]={};
        data[results.two[0]]=results.two[1];
        data[results.three[0]]={};
        data[results.three[0]]=results.three[1];
        data[results.four[0]]={};
        data[results.four[0]]=results.four[1];
        saveText2File(`./result/new_${Date.now()}.json`, JSON.stringify(data, null, "\t"));
    });
    t1 = new Date().getTime();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}




var crawlHomePage = async (uri)=>{
    t0 = new Date().getTime();
    console.log(uri);
    fetchUrl("https://batdongsan.com.vn/", function(error, meta, body){
        const $ = require('cheerio').load(body);
        url  = getURLElenments($).map(ele=>extractLink(ele));
        url2  = getURLElenments2($).map(ele=>extractLink(ele));
        crawl(url,url2);
    });
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


