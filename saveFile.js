const fs = require('fs');
const saveText2File = (filepath, text) => {
    fs.writeFile(filepath, text, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
module.exports = saveText2File;