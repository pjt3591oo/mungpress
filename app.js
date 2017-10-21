/**
 * Created by bagjeongtae on 2017. 10. 20..
 */
const app = require('./modules/application')();
const debug = require('./debug')('app');

const staticServe = require('./static-serve');
const Logger = require('./logger');
const bodyParser = require('./body-parser');

const index = (req, res, next) => {
    const posts = [
      {title: 'post 3', body: 'this is post 3'},
      {title: 'post 2', body: 'this is post 2'},
      {title: 'post 1', body: 'this is post 1'},
    ];
    debug(`middleware test ${posts[0]}`);
    next();
};

const error404 = (req, res, next) => {
  res.statusCode = 404;
  next()
};

const error = (err, req, res, next) => {
  debug('err mw:', err.message || err);
  res.statusCode = 500;
  next()
};

app.use(Logger());
app.use(staticServe); // 헤더 설정
app.use(bodyParser);
app.use(index);

app.get('/get', (req, res)=>{
   debug('get test');
   res.send('asd');
});

app.post('/post', (req, res)=>{
    debug('post test');
    res.send('post');
});

debug('app is initiated');

module.exports = app;