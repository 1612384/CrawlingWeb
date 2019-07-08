var Menu = require('./menu')
var Ban = require('../models/ban')
var Mua = require('../models/mua')
var ChoThue = require('../models/chothue')
var CanThue = require('../models/canthue')
var MenuType = require('../models/menu')
var async = require('async')
var _ = require('lodash')
function formatDate(date){
    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    var day = dd + '/' + mm + '/' + yyyy;
    return day
    }
exports.index = async function(req, res) {
    var menu = await Menu.index()
    res.render('index', { menu: menu});
};
exports.getDataBan = async function(req, res) {
    var type = await MenuType.findOne({'link':'/'+req.params.type});

    if(type.name == 'Nhà đất bán')
    {
        var data = await Ban.find();
    }
    else{
        var data = await Ban.find({'type':type.name});
    }
    data.forEach(ele=>{
        ele.fdate = formatDate(ele.date);
        return ele;
    })
    res.json(data);
};
exports.getDataMua = async function(req, res) {
    var type = await MenuType.findOne({'link':'/'+req.params.type});

    if(type.name == 'Nhà đất cần mua')
    {
        var data = await Mua.find();
    }
    else{
        var data = await Mua.find({'type':type.name});
    }
    data.forEach(ele=>{
        ele.fdate = formatDate(ele.date);
        return ele;
    })
    res.json(data);
};
exports.getDataChoThue = async function(req, res) {
    var type = await MenuType.findOne({'link':'/'+req.params.type});

    if(type.name == 'Nhà đất cho thuê')
    {
        var data = await ChoThue.find();
    }
    else{
        var data = await ChoThue.find({'type':type.name});
    }
    data.forEach(ele=>{
        ele.fdate = formatDate(ele.date);
        return ele;
    })
    res.json(data);
};
exports.getDataCanThue = async function(req, res) {
    var type = await MenuType.findOne({'link':'/'+req.params.type});

    if(type.name == 'Nhà đất cần thuê')
    {
        var data = await CanThue.find();
    }
    else{
        var data = await CanThue.find({'type':type.name});
    }
    data.forEach(ele=>{
        ele.fdate = formatDate(ele.date);
        return ele;
    })
    res.json(data);
};
function compare(a, b) {
    
    let comparison = 0;
    if (a.date<b.date) {
      comparison = 1;
    } else if (a.date>b.date) {
      comparison = -1;
    }
    return comparison;
  }
exports.getDataCanThueMua = function(req, res) {
    var data;
    async.parallel({
        one: function(callback) {
            CanThue.find().exec(callback);
        },
        two: function(callback) {
            Mua.find().exec(callback);
        }
    }, function(err, results) {
        data  = _.concat(results.one,results.two);
        data = data.sort(compare);
        data.forEach(ele=>{
            ele.fdate = formatDate(ele.date);
            return ele;
        })
        res.json(data);

    });
    
};
exports.returnHome = async function(req, res) {
    res.redirect('https://batdongsan.com.vn'+req.url);
};