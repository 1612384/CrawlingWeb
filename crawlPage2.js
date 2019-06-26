const _ = require('lodash')
var afterLoad = require('after-load');

var data = {}

exports.crawl = (title,uri) =>{
    count = 0;
    console.log(uri);
    var html = afterLoad(uri)
    const $ = require('cheerio').load(html);
    getNewsElements($).map(ele=>extractNewsInfo(ele,title))
    return data
}
exports.resetData = ()=>{
    data={};
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

const extractNewsInfo = ($,title) => {
    let city = $.find('.p-main .p-content .floatleft .inline-blk .product-city-dist').text().replace(new RegExp('\n', 'g'),'');
    let dist = $.find('.p-main .p-content .floatleft .product-city-dist').first().text().replace(new RegExp('\n', 'g'),'');
    var res = [];
    res.push(dist);
    res.push(city);
    if(!data[title][res[1]])
    {
        data[title][res[1]] = {};
    }
    if(!data[title][res[1]][res[0]])
    {
        data[title][res[1]][res[0]]  = {};
    }

    let areaField = $.find('.p-main .p-content .floatleft .product-area').text().replace(new RegExp('\n', 'g'),'');

    if(!data[title][res[1]][res[0]][areaField])
    {
        data[title][res[1]][res[0]][areaField]  = {};
    }

    let priceField = $.find('.p-main .p-content .floatleft .product-price').text().replace(new RegExp('\n', 'g'),'');
   
    if(!data[title][res[1]][res[0]][areaField][priceField]){
        data[title][res[1]][res[0]][areaField][priceField]  = {};
    }

    let date = $.find('.p-main .p-content .floatright').text().replace(new RegExp('\n', 'g'),'');

    if(!data[title][res[1]][res[0]][areaField][priceField][date]){
        data[title][res[1]][res[0]][areaField][priceField][date]  = [];
    }

    var news = {
        title: $.find('.p-title >a').attr('title').replace(new RegExp('\n', 'g'),''),
        link: $.find('.p-title >a').attr('href').replace(new RegExp('\n', 'g'),''),
        thumbnail:$.find('.p-main .p-main-image-crop >a >img').attr('src').replace(new RegExp('\n', 'g'),''),
        content: $.find('.p-main .p-content .p-main-tex').text().replace(new RegExp('\n', 'g'),''),
    }
    
    data[title][res[1]][res[0]][areaField][priceField][date].push(news);
    ++count;
}