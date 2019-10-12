// 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
var eventEmitter = new events.EventEmitter();
eventEmitter.emit('error');
eventEmitter.on('error', function () {
    // 一定要有接收
});

eventEmitter.on('connection', function () {
    console.log(1);
});
var listener = function () {
    console.log(2);
}
eventEmitter.addListener('connection', listener);


console.log(eventEmitter.listenerCount('connection') + '个事件');
eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listener)
console.log(eventEmitter.listenerCount('connection') + '个事件');
eventEmitter.emit('connection');
