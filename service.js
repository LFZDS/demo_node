var http = require('http');
var url = require('url');
var events = require('events');
var querystring = require('querystring');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    if (request.method === 'GET') {
        response.write('45453');
        response.end('1212112');
    } else {
        var data = '';
        request.on('data', function (v) {
            data += v;
        });

        request.on('end', function () {
            var body = querystring.parse(data);
            response.end(body.age);
        });
    }

}).listen(8086);





