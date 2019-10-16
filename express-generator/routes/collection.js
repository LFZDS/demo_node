var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

// 插入一条数据
router.get('/insert', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.insert({name:req.query.name, age: req.query.age}, function (err, res) {
        co.find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            resuest.send(result);
        });
    });

});


// 插入几条数据
router.get('/findAll', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        resuest.send(result);
    });

});

// 插入几条数据
router.get('/find', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.find({name:req.query.name, age: req.query.age}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        resuest.send(result);
    });

});

// 插入几条数据
router.post('/insertMany', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.insertMany(req.query.data, function (err, res) {
        co.find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            resuest.send(result);
        });
    });

});

// 更新一条数据
router.get('/updateOne', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.updateOne({name: req.query.name}, {$set: {desc: req.query.desc}}, function () {
        co.find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            resuest.send(result);
        });
    });
});

// 更新几条数据
router.get('/updateMany', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.updateOne({name: req.query.name}, {$set: {desc: req.query.desc}}, function () {
        co.find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            resuest.send(result);
        });
    });
});

// 删除一条数据
router.get('/deleteOne', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.deleteOne({name: req.query.name, age: req.query.age}, function () {
        console.log({name: req.query.name, age: req.query.age});
        co.find({name: req.query.name, age: req.query.age}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            resuest.send(result);
        });
    });
});

//  删除几条数据
router.get('/deleteMany', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.deleteMany({name: req.query.name, age: req.query.age}, function () {
        co.find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            resuest.send(result);
        });
    });
});

//  删除几条数据
router.get('/sort', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.find({}).sort({age: -1}).limit(2).skip(1).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        resuest.send(result);
    });
});


//  删除几条数据
router.get('/aggregate', function(req, res, next) {
    var db = req.app.locals.db.db('express');
    var co = db.collection('table');
    var resuest = res;
    co.aggregate([
        { $lookup:
            {
                from: 'table2',            // 右集合
                localField: 'name',    // 左集合 join 字段
                foreignField: 'name',         // 右集合 join 字段
                as: 'aa'           // 新生成字段（类型array）
            }
        }
    ]).toArray(function(err, res) {
        if (err) throw err;
        resuest.send(res);
    });
});

module.exports = router;
