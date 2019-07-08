const _ = require('lodash')
var afterLoad = require('after-load');
var Menu = require('./model/menu')
var data = []

var Model;

exports.crawl = (title,uri,model) =>{
    Model = model;
    count = 0;
    console.log(uri);
    var html = afterLoad(uri)
    const $ = require('cheerio').load(html);
    getNewsElements($).map(ele=>extractNewsInfo(ele,title))
    return data
}
exports.resetData = ()=>{
    data=[];
}
exports.setKind = (title)=>{
    data[title] = {}
}
const getNewsElements= ($) => {
    let newsEles = [];
    _.each($('.tintuc-row1'),ele => {
        newsEles.push($(ele));
    });
    return newsEles;
};

const extractNewsInfo = ($,title) => {
    let city_dist = $.find('.p-main .p-bottom-crop .floatleft .product-city-dist').text().replace(new RegExp('\n', 'g'),'');
    var res = city_dist.split(",");
    var city = res[1];
    var dist = res[0];
    let area = $.find('.p-main .p-bottom-crop .floatleft .product-area').text();
    if(area != "Không xác định")
    {
        var resArea  = area.split(" ");
        area = resArea[0];
    }

    let price = $.find('.p-main .p-bottom-crop .floatleft .product-price').text();
    
    let date = $.find('.p-main .p-bottom-crop .floatright >span').text().replace(new RegExp('\n', 'g'),'');
    if($.find('.p-main .p-bottom-crop .floatright >span >strong').first().text() != ""){
        date = $.find('.p-main .p-bottom-crop .floatright >span:nth-child(3)').text().replace(new RegExp('\n', 'g'),'');
    }
    date = date.split("/");
    date = date[2]+"-"+date[1]+"-"+date[0];
    date = new Date(date);
    var news = new Model({
        title: $.find('.p-title >h3 >a').text().replace(new RegExp('\n', 'g'),''),
        link: $.find('.p-title >h3 >a').attr('href').replace(new RegExp('\n', 'g'),''),
        thumbnail:$.find('.p-main .p-main-image-crop .product-avatar >img').attr('src'),
        content: $.find('.p-main .p-content .p-main-text').text(),
        contact: $.find('.p-main .p-bottom-crop .floatright >span >strong').first().text(),
        mobile: $.find('.p-main .p-bottom-crop .floatright >span .mobile').text(),
        price: price,
        city: city,
        dist: dist,
        area: area,
        price: price,
        date: date,
        type: title,
    })
    return data.push(news)
}
