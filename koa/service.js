var koa = require('koa');
var router = require('koa-router')();
var fs = require('fs');
const bodyParser = require('koa-bodyparser');
var app = new koa();

app.use(bodyParser());
app.use(async (ctx, next) => {
    console.log(ctx.myname);
    await next();
    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello, koa2!</h1>';
});

router.get('/getName/:name', async (ctx, next) => {
    ctx.response.body = ctx.params.name + ctx.query.age;
});

router.post('/getData', async (ctx, next) => {
    ctx.response.body = 1;
    ctx.response.status = 201;

});

// 可以抽离出一个controllers.js文件，懒，不写了
const addControllers = (router) => {
    const files = fs.readdirSync(__dirname+'/controllers');
    const routerFiles = files.filter((item) => {
        return item.endsWith('.js');
    });
    for (var item of routerFiles) {
        var mapping = require(__dirname+'/controllers/' + item);
        addRouters(router, mapping);
    }
}
const addRouters = (router, mapping) => {
    for (var item in mapping) {
        if (item.startsWith('GET ')) {
            const path = item.substring(4);
            router.get(path, mapping[item]);
        } else {
            const path = item.substring(5);
            router.post(path, mapping[item]);
        }
    };
}
addControllers(router);

// 公共数据
app.context.myname = 'haha';
app.use(router.routes());

app.listen(8777);