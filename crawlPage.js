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
    await driver.wait(until.elementIsVisible, 1000)
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
    let city_dist = $.find('.p-main .p-bottom-crop .floatleft .product-city-dist').text().replace(new RegExp('\n', 'g'),'');
    var res = city_dist.split(",");
    if(!data[res[1]])
    {
        data[res[1]] = {};
    }
    if(!data[res[1]][res[0]])
    {
        data[res[1]][res[0]]  = {};
    }

    let area = $.find('.p-main .p-bottom-crop .floatleft .product-area').text();
    var areaField;
    if(area == "Không xác định")
    {
        areaField = "Không xác định";
    }
    else
    {
        var resArea  = area.split(" ");
        if(resArea[0] >= 500)
        {
            areaField = ">=500 m2";
        }
        else if(resArea[0] >= 300)
        {
            areaField = "300 - 500 m2";
        }
        else if(resArea[0] >= 250)
        {
            areaField = "250 - 300 m2";
        }
        else if(resArea[0] >= 200)
        {
            areaField = "200 - 250 m2";
        }
        else if(resArea[0] >= 150)
        {
            areaField = "150 - 200 m2";
        }
        else if(resArea[0] >= 100)
        {
            areaField = "100 - 150 m2";
        }
        else if(resArea[0] >= 50)
        {
            areaField = "50 - 100 m2";
        }
        else if(resArea[0] >= 30)
        {
            areaField = "30 - 50 m2";
        }
        else
        {
            areaField = "<=30 m2";
        }
    }
    if(!data[res[1]][res[0]][areaField])
    {
        data[res[1]][res[0]][areaField]  = {};
    }

    let price = $.find('.p-main .p-bottom-crop .floatleft .product-price').text();
    var priceField;
    if(price == "Thỏa thuận")
    {
        priceField = "Thỏa thuận";
    }
    else{
        var resPrice  = price.split(" ");
        if(resPrice[2] == "triệu")
        {
            if(resPrice[0 >= 800])
            {
                priceField = "800-1 tỷ";
            }
            if(resPrice[0] >= 500)
            {
                priceField = "500-800 tr";
            }
            else
            {
                priceField = "< 500 tr";
            }
        }
        else
        {
            if(resPrice[0] > 30)
            {
                priceField = ">30 tỷ";
            }
            else if(resPrice[0] >= 20)
            {
                priceField = "20 - 30 tỷ";
            }
            else if(resPrice[0] >= 10)
            {
                priceField = "10 - 20 tỷ";
            }
            else if(resPrice[0] >= 7)
            {
                priceField = "7 - 10 tỷ";
            }
            else if(resPrice[0] >= 5)
            {
                priceField = "5 - 7 tỷ";
            }
            else if(resPrice[0] >= 3)
            {
                priceField = "3 - 5 tỷ";
            }
            else if(resPrice[0] >= 2)
            {
                priceField = "2 - 3 tỷ";
            }
            else 
            {
                priceField = "1 - 2 tỷ";
            }
        }
    }

    if(!data[res[1]][res[0]][areaField][priceField]){
        data[res[1]][res[0]][areaField][priceField]  = [];
    }

    
    var news = {
        title: $.find('.p-title >h3 >a').text().replace(new RegExp('\n', 'g'),''),
        thumbnail:$.find('.p-main .p-main-image-crop .product-avatar >img').attr('src'),
        content: $.find('.p-main .p-content .p-main-text').text(),
        date: $.find('.p-main .p-bottom-crop .floatright >span').text(),
    }
    
    data[res[1]][res[0]][areaField][priceField].push(news);
    ++count;
}

module.exports = crawl