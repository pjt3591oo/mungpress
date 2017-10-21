/**
 * Created by bagjeongtae on 2017. 10. 21..
 */
const request = req => {
  if (!req) throw Error('req is required');

  const partials = req.url.split('?');
  const path = partials[0];
  if(partials.length> 1){

      const qs = partials[1].split('&').reduce((obj, p) => {
        const frag = p.split('=');
        obj[frag[0]] = frag[1];
        return obj
      }, {});

      req.params = req.params || qs;
  }
  req.path = req.path || path;

  return req;
};

module.exports = request;