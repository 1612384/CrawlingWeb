const _ = require('lodash')
const saveText2File = require('./saveFile');

var async = require('async')


var data = {}
var count
var crawl = async (driver,until,uri,type)=>{
    count = 0;
    if(!type){
        data = {}
    }
    console.log(uri);
    await driver.get(uri)
    var source = await driver.getPageSource()
    const $ = require('cheerio').load(source);
    getNewsElements($).map(ele=>extractNewsInfo(ele))
    console.log(count);
    return {data,count};
    
}
const getNewsElements= ($) => {
    let newsEles = [];
    _.each($('[uid]'),ele => {
        newsEles.push($(ele));
    });
    return newsEles;
};

const extractNewsInfo = ($) => {
    let city = $.find('.p-main .p-content .floatleft .inline-blk .product-city-dist').text().replace(new RegExp('\n', 'g'),'');
    let dist = $.find('.p-main .p-content .floatleft .product-city-dist').first().text().replace(new RegExp('\n', 'g'),'');
    var res = [];
    res.push(dist);
    res.push(city);
    if(!data[res[1]])
    {
        data[res[1]] = {};
    }
    if(!data[res[1]][res[0]])
    {
        data[res[1]][res[0]]  = {};
    }

    let areaField = $.find('.p-main .p-content .floatleft .product-area').text().replace(new RegExp('\n', 'g'),'');

    if(!data[res[1]][res[0]][areaField])
    {
        data[res[1]][res[0]][areaField]  = {};
    }

    let priceField = $.find('.p-main .p-content .floatleft .product-price').text().replace(new RegExp('\n', 'g'),'');
   
    if(!data[res[1]][res[0]][areaField][priceField]){
        data[res[1]][res[0]][areaField][priceField]  = {};
    }

    let date = $.find('.p-main .p-content .floatright').text().replace(new RegExp('\n', 'g'),'');

    if(!data[res[1]][res[0]][areaField][priceField][date]){
        data[res[1]][res[0]][areaField][priceField][date]  = [];
    }

    var news = {
        title: $.find('.p-title >a').attr('title').replace(new RegExp('\n', 'g'),''),
        link: $.find('.p-title >a').attr('href').replace(new RegExp('\n', 'g'),''),
        thumbnail:$.find('.p-main .p-main-image-crop >a >img').attr('src').replace(new RegExp('\n', 'g'),''),
        content: $.find('.p-main .p-content .p-main-tex').text().replace(new RegExp('\n', 'g'),''),
    }
    
    data[res[1]][res[0]][areaField][priceField][date].push(news);
    ++count;
}

module.exports = crawl