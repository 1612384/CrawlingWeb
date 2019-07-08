var Menu = require('./menu')
exports.index = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/nha-dat-can-mua'});
};
exports.index1 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-cac-loai-bat-dong-san-khac'});
};
exports.index2 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-nha-biet-thu-lien-ke'});
};
exports.index3 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-kho-nha-xuong'});
};
exports.index4 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-dat-nen-du-an'});
};
exports.index5 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-can-ho-chung-cu'});
};
exports.index6 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-dat'});
};
exports.index7 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-nha-rieng'});
};
exports.index8 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-trang-trai-khu-nghi-duong'});
};
exports.index9 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news2', { menu: menu, type:'mua/mua-nha-mat-pho'});
};
