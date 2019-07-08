var Menu = require('./menu')
exports.index = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/nha-dat-can-thue'});
};
exports.index1 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-nha-tro-phong-tro'});
};
exports.index2 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-can-ho-chung-cu'});
};
exports.index3 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-nha-rieng'});
};
exports.index4 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-kho-nha-xuong-dat'});
};
exports.index5 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-cua-hang-ki-ot'});
};
exports.index6 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-nha-mat-pho'});
};
exports.index7 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-loai-bat-dong-san-khac'});
};
exports.index8 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canthue/can-thue-van-phong'});
};

exports.index9 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'canmuacanthue'});
};