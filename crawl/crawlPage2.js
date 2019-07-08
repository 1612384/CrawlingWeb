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
    _.each($('[uid]'),ele => {
        newsEles.push($(ele));
    });
    return newsEles;
};

const extractNewsInfo = async ($,title) => {
    let city = $.find('.p-main .p-content .floatleft .inline-blk .product-city-dist').text().replace(new RegExp('\n', 'g'),'');
    let dist = $.find('.p-main .p-content .floatleft .product-city-dist').first().text().replace(new RegExp('\n', 'g'),'');
    let areaField = $.find('.p-main .p-content .floatleft .product-area').text().replace(new RegExp('\n', 'g'),'');
    let priceField = $.find('.p-main .p-content .floatleft .product-price').text().replace(new RegExp('\n', 'g'),'');
    let date = $.find('.p-main .p-content .floatright').text().replace(new RegExp('\n', 'g'),'');
    date = date.split("/");
    date = date[2]+"-"+date[1]+"-"+date[0];
    date = new Date(date);
    var news = new Model({
        title: $.find('.p-title >a').attr('title').replace(new RegExp('\n', 'g'),''),
        link: $.find('.p-title >a').attr('href').replace(new RegExp('\n', 'g'),''),
        thumbnail:$.find('.p-main .p-main-image-crop >a >img').attr('src').replace(new RegExp('\n', 'g'),''),
        content: $.find('.p-main .p-content .p-main-tex').text().replace(new RegExp('\n', 'g'),''),
        price: priceField,
        city: city,
        dist: dist,
        area: areaField,
        price: priceField,
        date: date,
        type: title,
    })
    return data.push(news)
}