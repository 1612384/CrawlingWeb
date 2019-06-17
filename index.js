const _ = require('lodash')
const saveText2File = require('./saveFile');

var async  = require('async');
var crawlPage = require('./crawlPage');

const {Builder, until} = require('selenium-webdriver');


let driver = new Builder()
    .forBrowser('firefox')
    .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
    .build();

let uri = "https://batdongsan.com.vn";
let url = []
crawlPage(driver,"https://batdongsan.com.vn/ban-can-ho-chung-cu")
// var crawlHomePage = (uri)=>{
//     driver.get(uri)
//         .then(() => driver.getPageSource())
//         .then((source) => {
//             const $ = require('cheerio').load(source);
//             url  = getURLElenments($).map(ele=>extractLink(ele));
//         })
//         .then(() => driver.close())
// }
// const getURLElenments= ($) => {
//     let urlEles = [];
//     _.each($('.lv1'),ele => {
//         urlEles.push($(ele));
//     });
//     return urlEles;
// };
// var extractLink = ($) => {
//     let title = $.find('>a').text();
//     let link = $.find('>a').attr('href');
//     return {
//         title,
//         link,
//     };
// }

//crawlHomePage(uri);

