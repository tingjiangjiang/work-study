let hi = 'hello';

function sayHi() {
	console.log('你好');
}

class Tigger {
	constructor() {
		this.type = '老虎';
	}
	sayHi() {
		console.log('大叫一声');
	}
}

// exports.Tigger = Tigger;//可以

// exports = Tigger;//不可以
// module.exports = Tigger;//可以

// exports和module.exports的区别？
// exports是module.exports的一个引用，代码示例如下：
// let module = {
// 	exports: {},
// };
// let exports = module.exports;

// exports.hi = hi;
// module.exports.sayHi = sayHi;

// exports = hi;
// module.exports = hi;

// exports.hi = hi;
// exports.say = sayHi;

// module.exports.hi = hi;
// module.exports.say = sayHi;

// console.log(module);
// console.log(exports);
// console.log(module.exports);
