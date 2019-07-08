var express = require('express');
var router = express.Router();

var index = require('../controllers/index')
var Ban = require('../controllers/ban')
var Mua = require('../controllers/mua')
var ChoThue = require('../controllers/chothue')
var CanThue = require('../controllers/canthue')
var TinTuc = require('../controllers/tintuc')

/* GET home page. */
router.get('/', index.index);
router.get('/nha-dat-ban', Ban.index);
router.get('/ban-can-ho-chung-cu', Ban.index1);
router.get('/ban-nha-mat-pho', Ban.index2);
router.get('/ban-loai-bat-dong-san-khac', Ban.index3);
router.get('/ban-nha-biet-thu-lien-ke', Ban.index4);
router.get('/ban-trang-trai-khu-nghi-duong', Ban.index5);
router.get('/ban-dat', Ban.index6);
router.get('/ban-kho-nha-xuong', Ban.index7);
router.get('/ban-dat-nen-du-an', Ban.index8);
router.get('/ban-nha-rieng', Ban.index9);


router.get('/nha-dat-cho-thue', ChoThue.index);
router.get('/cho-thue-van-phong', ChoThue.index1);
router.get('/cho-thue-nha-rieng', ChoThue.index2);
router.get('/cho-thue-kho-nha-xuong-dat', ChoThue.index3);
router.get('/cho-thue-nha-mat-pho', ChoThue.index4);
router.get('/cho-thue-loai-bat-dong-san-khac', ChoThue.index5);
router.get('/cho-thue-nha-tro-phong-tro', ChoThue.index6);
router.get('/cho-thue-can-ho-chung-cu', ChoThue.index7);
router.get('/cho-thue-cua-hang-ki-ot', ChoThue.index8);


router.get('/nha-dat-can-thue', CanThue.index);
router.get('/can-thue-nha-tro-phong-tro', CanThue.index1);
router.get('/can-thue-can-ho-chung-cu', CanThue.index2);
router.get('/can-thue-nha-rieng', CanThue.index3);
router.get('/can-thue-kho-nha-xuong-dat', CanThue.index4);
router.get('/can-thue-cua-hang-ki-ot', CanThue.index5);
router.get('/can-thue-nha-mat-pho', CanThue.index6);
router.get('/can-thue-loai-bat-dong-san-khac', CanThue.index7);
router.get('/can-thue-van-phong', CanThue.index8);

router.get('/can-mua-can-thue', CanThue.index9);

router.get('/nha-dat-can-mua', Mua.index);
router.get('/mua-cac-loai-bat-dong-san-khac', Mua.index1);
router.get('/mua-nha-biet-thu-lien-ke', Mua.index2);
router.get('/mua-kho-nha-xuong', Mua.index3);
router.get('/mua-dat-nen-du-an', Mua.index4);
router.get('/mua-can-ho-chung-cu', Mua.index5);
router.get('/mua-dat', Mua.index6);
router.get('/mua-nha-rieng', Mua.index7);
router.get('/mua-trang-trai-khu-nghi-duong', Mua.index8);
router.get('/mua-nha-mat-pho', Mua.index9);


router.get('/tin-tuc', TinTuc.index);

router.get('/bat-dong-san-the-gioi', TinTuc.index1);
router.get('/phan-tich-nhan-dinh', TinTuc.index2);
router.get('/chinh-sach-quan-ly', TinTuc.index3);
router.get('/thong-tin-quy-hoach', TinTuc.index4);
router.get('/tin-thi-truong', TinTuc.index5);
router.get('/tai-chinh-chung-khoan-bat-dong-san', TinTuc.index6);

router.get('/tu-van-luat-bat-dong-san', TinTuc.index7);
router.get('/trinh-tu-thu-tuc', TinTuc.index8);
router.get('/cac-van-de-co-yeu-to-nuoc-ngoai', TinTuc.index9);
router.get('/xay-dung-hoan-cong', TinTuc.index10);
router.get('/tranh-chap', TinTuc.index11);
router.get('/nghia-vu-tai-chinh', TinTuc.index12);
router.get('/quyen-so-huu', TinTuc.index13);


router.get('/loi-khuyen', TinTuc.index14);
router.get('/loi-khuyen-cho-nguoi-cho-thue', TinTuc.index15);
router.get('/loi-khuyen-cho-nha-dau-tu', TinTuc.index16);
router.get('/loi-khuyen-cho-nguoi-ban', TinTuc.index17);
router.get('/loi-khuyen-cho-nguoi-thue', TinTuc.index18);
router.get('/loi-khuyen-cho-nguoi-mua', TinTuc.index19);




router.get('/data/ban/:type', index.getDataBan);
router.get('/data/mua/:type', index.getDataMua);
router.get('/data/chothue/:type', index.getDataChoThue);
router.get('/data/canthue/:type', index.getDataCanThue);
router.get('/data/canmuacanthue', index.getDataCanThueMua);
router.get('/data/tintuc/:type', index.getDataTinTuc);



router.get('/*',index.returnHome);
module.exports = router;
