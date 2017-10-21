/**
 * Created by bagjeongtae on 2017. 10. 20..
 */
const fs = require('fs');
const path = require('path');
const debug = require('./debug')('static-serve');

const staticServe = (req, res, next) => {
    const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };

    const ext = path.parse(req.url).ext;
    const publicPath = path.join(__dirname, './public');
    if (Object.keys(mimeType).includes(ext)) {
        // fs.readFile(`${publicPath}${req.url}`, (err, data) => {
        //       if (err) {
        //         res.statusCode = 404;
        //         res.end();
        //         return;
        //       }

        res.statusCode = 200;
        res.setHeader('Content-Type', mimeType[ext]);
        next();
        // });
      // return;
    }
    next();
};

module.exports = staticServe;
