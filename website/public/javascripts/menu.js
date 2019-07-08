// var webix = require('webix');
// var topmenu = {
//     view:"menu",
//     data:[
//       { id:"1",value:"Translate...", submenu:[
//         "English", 
//         { value:"Slavic...", submenu:[
//           "Belarusian", "Russian", {value:"Ukrainian", submenu:["1", "2"]}
//         ]},
//         "German"
//       ]},
//       { id:"2", value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},    
//       { id:"3",value:"Info" }
//     ],  
//     on:{
//       onMenuItemClick:function(id){
//         webix.message("Click: "+this.getMenuItem(id).value);     
//       }
//     },
//     type:{
//       subsign:true
//     }
//   };	
  
//   var menu = {
//     view:"menu", id:"m1",
//     layout:"y",
//     submenu:"data",
//     submenuConfig:{
//       submenu:"data"
//     },
//     subMenuPos:"right",
//     width:200,
//     select:true,
//     data:[
//       { value:"Translate...", data:[ 
//         "English", 
//         { value:"Slavic...", data:[
//           "Belarusian", "Russian", {value:"Ukrainian", data:["1", "2"]}
//         ]},
//         "German"
//       ]},
//       { value:"Post...", data:[ "Facebook", "Google+", "Twitter" ]},
//       { $template:"Separator" },
//       { value:"Info" }
//     ],
//     on:{
//       onMenuItemClick:function(id){
//         $$("t1").setHTML("Click: "+this.getMenuItem(id).value);
//       }
//     },
//     type:{
//       subsign:true
//     }
//   };	
  
//   webix.ui({
//     type:"space",
//     rows:[
//       topmenu,
//       {cols:[ 
//         menu, 
//         { id:"t1", template:" " }
//       ]}
//     ]
//   });
  