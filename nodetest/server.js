var http = require('http'),
    util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(req.headers) + '\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
console.log('Process: ' + process.pid);
