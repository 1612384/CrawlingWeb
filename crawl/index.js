const _ = require('lodash')
const saveText2File = require('./saveFile');

var async  = require('async');
var crawlPage = require('./crawlPage');
var crawlPage2 = require('./crawlPage2');
var crawlPage3 = require('./crawPage3');
var crawlPage4 = require('./crawPage4');
var afterLoad = require('after-load');
var fetchUrl = require("fetch").fetchUrl;

var t0;
var t1;


// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://admin:123@demo-l6r8b.mongodb.net/CRAWL?retryWrites=true"
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var Ban = require('./model/ban');
var Mua = require('./model/mua');
var ChoThue = require('./model/chothue');
var CanThue = require('./model/canthue');
var TinTuc = require('./model/tintuc')
var uri ="https://batdongsan.com.vn"


var crawlType = function(title,url,type,model,parent){
    data = {}
    page = [1,2,3,4,5];
    crawlPage4.setKind(title);
    async.map(page, (ele,callback)=> {
        url1 = url + "/p" + ele;
        callback(null,crawlPage4.crawl(title,url1,model,parent));
    }, function(err, results) {
        data = results[4];
    });
    return data;
}

//crawl nha dat ban
var crawl = async function(url,url1){
    var data = [];
    async.parallelLimit({
        // one: function(callback) {
        //     var url2 = _.slice(url, 0, 9)
        //     crawlPage.resetData();
        //     async.mapLimit(url2,3,(ele,callback)=> {
        //         callback(null,crawlType(ele.title,uri+ele.link,1,Ban));
        //     }, function(err, results) {
        //         callback(err,results[8]);
        //     });
        // },
        // two: function(callback) {
        //     crawlPage.resetData();
        //     url2 = _.slice(url, 9, 17)
        //     async.mapLimit(url2,2, (ele,callback)=> {
        //         callback(null,crawlType(ele.title,uri+ele.link,1,ChoThue));
        //     }, function(err, results) {
        //         callback(err,results[7]);
        //     });
        // },
        // three: function(callback) {
        //     crawlPage2.resetData();
        //     var url2 = _.slice(url1, 0,9)
        //     async.mapLimit(url2,3,(ele,callback)=> {
        //         callback(null,crawlType(ele.title,uri+ele.link,2,Mua));
        //     }, function(err, results) {
        //         callback(err,results[8]);
        //     });
        // },
        // four: function(callback) {
        //     crawlPage2.resetData();
        //     url2 = _.slice(url1, 9, 17)
        //     async.mapLimit(url2,2,(ele,callback)=> {
        //         callback(null,crawlType(ele.title,uri+ele.link,2,CanThue));
        //     }, function(err, results) {
        //         callback(err,results[7]);
        //     });
        // }
        five: function(callback) {
            var url2 = _.slice(url, 29, 35)
            crawlPage4.resetData();
            async.mapLimit(url2,3,(ele,callback)=> {
                callback(null,crawlType(ele.title,uri+ele.link,1,TinTuc,undefined));
            }, function(err, results) {
                callback(err,results[5]);
            });
        },
        // six: function(callback) {
        //     var url2 = _.slice(url1, 23, 28)
        //     crawlPage4.resetData();
        //     async.mapLimit(url2,3,(ele,callback)=> {
        //         callback(null,crawlType(ele.title,uri+ele.link,1,TinTuc,"Lời khuyên"));
        //     }, function(err, results) {
        //         callback(err,results[4]);
        //     });
        // },
    },1, function(err, results) {
        // _.each(results.one,ele=>{
        //     ele.save();
        // })
        // _.each(results.two,ele=>{
        //     ele.save();
        // })
        // _.each(results.three,ele=>{
        //     ele.save();
        // })
        // _.each(results.four,ele=>{
        //     ele.save();
        // })
        data = results.five;
    });
    await Promise.all(data.map(ele=>{
        ele.save();
    }))
    t1 = new Date().getTime();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}




var crawlHomePage = async (uri)=>{
    t0 = new Date().getTime();
    console.log(uri);
    var html = afterLoad(uri)
    const $ = require('cheerio').load(html);
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


