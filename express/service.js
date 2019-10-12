var express = require('express');
var fs = require('fs');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var util = require('util');
//var bodyParser = require('body-parser');
var app = express();

app.use(cookieParser());
app.get('/', function (req, res) {
    var info = {
        app: req.app,
        baseUrl: req.baseUrl,
        body: req.body,
        hostname: req.hostname,
        originalUrl: req.originalUrl,
        path: req.path,
        route: req.route,
        params: req.params,
        query: req.query
    };
    res.status(200);
    res.cookie('name', 'lifang');
    res.send(info);
    // var stream = fs.createWriteStream('res.txt', {encoding:'utf8'});
    // stream.write(JSON.stringify(res.json));
});
app.get('/cookies', function (req, res) {
    res.send(util.inspect(req.cookies));
});

app.use('/image', express.static(__dirname + '/image'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.post('/file', function (req, res) {
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(__dirname + '/' + req.files[0].originalname, data, function (err) {});
    });
    fs.createReadStream(req.files[0].path).pipe(fs.createWriteStream(__dirname + '/image/' + req.files[0].originalname));
    res.send('成功');
});

var server = app.listen(8082, function () {
    // var host = server.address().address
    // var port = server.address().port
    //
    // console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
