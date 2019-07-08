const _ = require('lodash')
var afterLoad = require('after-load');
var Menu = require('./model/menu')
var data = []

var Model;

exports.crawl = (title,uri,model,parent) =>{
    Model = model;
    count = 0;
    console.log(uri);
    var html = afterLoad(uri)
    const $ = require('cheerio').load(html);
    getNewsElements($).map(ele=>extractNewsInfo(ele,title,parent))
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

const extractNewsInfo = async ($,title,parent) => {
    let date = $.find('.datetime').text().replace(new RegExp('\n', 'g'),'');
    dateTime = date.split(" ");
    date = dateTime[1].split("/");
    time = dateTime[0].split(":")
    date = new Date(date[2],date[1]-1,date[0],time[0],time[1],0);
    var news = new Model({
        title: $.find('>h3 >a').attr('title').replace(new RegExp('\n', 'g'),''),
        link: $.find('>h3 >a').attr('href').replace(new RegExp('\n', 'g'),''),
        thumbnail:$.find('>div >a >img').attr('src').replace(new RegExp('\n', 'g'),''),
        content: $.find('>p').text().replace(new RegExp('\n', 'g'),''),
        date: date,
        type: title,
        parent: parent, 
    })
    return data.push(news)
}