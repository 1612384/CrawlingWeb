var Menu = require('../models/menu')


exports.index = async function(req, res) {
    var menu = await Menu.find({"parent": undefined});
    var menu = await Promise.all(menu.map(async ele=>{
        ele["child"] = await Menu.find({"parent": ele._id});
        ele["child"] = await Promise.all(ele["child"].map(async ele=>{
            ele["child"] = await Menu.find({"parent": ele._id});
            ele["child"] = await Promise.all(ele["child"].map(async ele=>{
                ele["child"] = await Menu.find({"parent": ele._id});
                return ele;
            }))
            return ele;
        }))
        return ele;
    }));
    return menu;
}