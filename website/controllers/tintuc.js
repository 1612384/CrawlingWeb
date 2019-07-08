var Menu = require('./menu')
exports.index = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/tin-tuc'});
};
exports.index1 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/bat-dong-san-the-gioi'});
};
exports.index2 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/phan-tich-nhan-dinh'});
};
exports.index3 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/chinh-sach-quan-ly'});
};
exports.index4 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/thong-tin-quy-hoach'});
};
exports.index5 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/tin-thi-truong'});
};
exports.index6 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/tai-chinh-chung-khoan-bat-dong-san'});
};
exports.index7 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/tu-van-luat-bat-dong-san'});
};
exports.index8 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/trinh-tu-thu-tuc'});
};
exports.index9 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/cac-van-de-co-yeu-to-nuoc-ngoai'});
};
exports.index10 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/xay-dung-hoan-cong'});
};
exports.index11 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/tranh-chap'});
};
exports.index12 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/nghia-vu-tai-chinh'});
};
exports.index13 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/quyen-so-huu'});
};
exports.index14 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/loi-khuyen'});
};
exports.index15 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/loi-khuyen-cho-nguoi-cho-thue'});
};
exports.index16 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/loi-khuyen-cho-nha-dau-tu'});
};
exports.index17 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/loi-khuyen-cho-nguoi-ban'});
};
exports.index18 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/loi-khuyen-cho-nguoi-thue'});
};
exports.index19 = async function(req, res) {
    var menu = await Menu.index()
    res.render('news3', { menu: menu, type:'tintuc/loi-khuyen-cho-nguoi-mua'});
};