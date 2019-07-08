var Menu = require('./menu')
exports.index = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/nha-dat-ban"});
};
exports.index1 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-can-ho-chung-cu"});
};
exports.index2 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-nha-mat-pho"});
};
exports.index3 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-loai-bat-dong-san-khac"});
};
exports.index4 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-nha-biet-thu-lien-ke"});
};
exports.index5 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-trang-trai-khu-nghi-duong"});
};
exports.index6 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-dat"});
};
exports.index7 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-kho-nha-xuong"});
};
exports.index8 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-dat-nen-du-an"});
};
exports.index9 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type: "ban/ban-nha-rieng"});
};