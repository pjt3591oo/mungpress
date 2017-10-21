/**
 * Created by bagjeongtae on 2017. 10. 20..
 */
const http = require('http');
const debug = require('../debug')('app');

const request = require('../request');
const response = require('../response');

const Application = () => {
  const server = http.createServer((req, res) => {
    req = request(req);
    res = response(res);
    const runMw = (middlewares, i, err) => {
      if (i < 0 || i >= middlewares.length) return;

      const nextMw = middlewares[i];
      const next = () => e => runMw(middlewares, i + 1, e);

      if (err) {
        const isErrorMw = mw => mw.length === 4;
        if (isErrorMw(nextMw)) nextMw(err, req, res, next());

        // 에러가 있고, 다음에 실행할 미들웨어가 에러 처리기가 아니면 그 다음 미들웨어를 찾는다
        return runMw(middlewares, i + 1, err);
      }
      if (nextMw.__path) {
        // 요청한 url과 미들웨어에 설정한 경로가 같으면 미들웨어를 실행한다
        const isMatched = req.path === nextMw.__path &&
                          req.method.toLowerCase() === (nextMw.__method || 'get')
        if (isMatched) return nextMw(req, res, next());

        // 경로가 다르면 다음 미들웨어를 시도한다
        else return runMw(middlewares, i + 1);
      }
      return nextMw(req, res, next());
    };

    runMw(middlewares, 0, null);
  });

  let middlewares = [];

  return {
    listen: (port = 3000, hostname = '127.0.0.1', fn) =>{
      debug(`middlewares 등록갯수 ${middlewares.length}`);
      server.listen(port, hostname, fn);
    },
    use: (path, fn) => {
        if (typeof path === 'string' && typeof fn === 'function') {
          fn.__path = path;
        } else if (typeof path == 'function') {
          fn = path;
        } else {
          throw Error('Usage: use(path, fn) or use(fn)')
        }

        middlewares.push(fn)
    },
    get: (path, fn) => {
      if(!path || !fn) throw Error('path and fn is required');
      fn.__method = 'get';
      fn.__path = path;
      middlewares.push(fn);
        // use(path, fn)
    },
    post: (path, fn) => {
      if(!path || !fn) throw Error('path and fn is required');
      fn.__method = 'post';
      fn.__path = path;
      middlewares.push(fn);
      // use(path, fn);
    },
  }
};

module.exports = Application;