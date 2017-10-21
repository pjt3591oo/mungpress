/**
 * Created by bagjeongtae on 2017. 10. 20..
 */
const app = require('./app');
const debug = require('./debug')('app');

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () =>{
     debug(`Server running at http://${hostname}:${port}`);
});