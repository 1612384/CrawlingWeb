var Menu = require('./menu')
exports.index = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/nha-dat-cho-thue'});
};
exports.index1 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-van-phong'});
};
exports.index2 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-nha-rieng'});
};
exports.index3 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-kho-nha-xuong-dat'});
};
exports.index4 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-nha-mat-pho'});
};
exports.index5 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-loai-bat-dong-san-khac'});
};
exports.index6 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-nha-tro-phong-tro'});
};
exports.index7 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-can-ho-chung-cu'});
};
exports.index8 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news', { menu: menu,type:'chothue/cho-thue-cua-hang-ki-ot'});
};