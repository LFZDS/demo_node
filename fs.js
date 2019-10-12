var fs = require('fs');
var zlib = require('zlib');

var data = fs.readFileSync('index.txt');
console.log(data.toString());

fs.readFile('index.txt', function () {
    console.log('读完了')
});

fs.createReadStream('index.txt').pipe(fs.createWriteStream('index2.txt'));
fs.createReadStream('index.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('index3.txt.gz'));

// fs.createReadStream('index3.txt.gz')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('input.txt'))