/**
 * Created by bagjeongtae on 2017. 10. 21..
 */

const debug = require('./debug')('body-parser');


const bodyParser = (req, res, next) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
    debug('data', chunk)
  })
  req.on('end', () => {
      if(data.length){
          console.log(data[0].toString());
          const body = data[0].toString().split('&').reduce((body, pair) => {
              if (!pair) return body;
              const frg = pair.split('=');
              body[frg[0]] = frg[1];
              return body;
            }, {});

        req.body = body;
      }

    next()
  })
};

module.exports = bodyParser;