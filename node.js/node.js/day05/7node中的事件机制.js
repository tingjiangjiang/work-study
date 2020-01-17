// events专用于处理事件
let event = require('events');
let Emitter = event.EventEmitter;//EventEmitter 事件触发器
// 初始化一个事件对象
let e = new Emitter();
// 注册click事件，当事件响应的时候出发回调方法
// e.addListener('click', function(event) {
// 	console.log(event);
// });
// e.on('click', function(event) {
// 	console.log(event);
// });
// e.once('click', function(event) {
// 	console.log(event);
// });
// 注册多个同名事件
// e.setMaxListeners(3); //设置最大监听的数量
// e.getMaxListeners();
let second = function(event) {
	console.log('第二个');
};
e.on('click', function(event) {
	console.log('第一个');
});
// e.on('click', second);
// e.removeListener('click', second);//移除指定回调方法的click事件
// e.removeAllListeners('click'); //移除所有的click事件
// console.log(e.listenerCount('click')); //输出当前click事件注册了几个回调方法
e.listeners('click')//得到所有注册click的回调方法，是一个数组

// 发射一个事件
e.emit('click', { type: 'click', target: e });
e.emit('click', '来了');//emit发射
