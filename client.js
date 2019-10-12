var http = require('http');
var querystring = require('querystring');

var req = http.request({
    port: 8086,
    host: 'localhost',
    path: '/?name=212121',
    method:'POST',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
}, function (response) {
    var str='';
    response.on('data',function(chunk){
        str+=chunk;
    });
    response.on('end',function(){
        console.log(str);
    });
});
req.write(querystring.stringify({age: 19}));
req.end();