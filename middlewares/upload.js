
const multer = require('multer');
const path = require('path');
const fs = require('fs');

function upload(destination, fieldname) {
    fs.mkdirSync(destination, {recursive:true})
    
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, destination);
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "-" + Date.now() + ".jpg");
        }
    });

    return multer({ storage }).single(fieldname);
}



module.exports = upload;






