// // export class Animal {
// // 	constructor() {
// // 		this.type = '动物';
// // 	}
// // 	sayHi() {
// // 		console.log('大叫说一声');
// // 	}
// // }
// // export let myName = '童年-罗大佑';

// // 具名导出
// // export { Animal,myName };

// // 默认导出
// export default class Animal {
// 	constructor() {
// 		this.type = '动物';
// 	}
// 	sayHi() {
// 		console.log('大叫说一声');
// 	}
// }
// let myName = '童年-罗大佑';
// export { myName };
// // export default let myName = '童年-罗大佑'; //错误
// // export default myName = '童年-罗大佑'; //正确

// // export default let obj = {
// //     name : '10.1黄金周',
// //     age : 7
// // } //错误

// // export default {
// //     name : '10.1黄金周',
// //     age : 7
// // } //正确

// // let obj = {
// // 	name: '5.1七天乐',
// // 	age: 3,
// // };
// // export default obj;

// // export default Animal;

// // export {myName}


//------------练习-----------
class Animal {
	constructor() {
		this.type = '动物';
	}
	sayHi() {
		console.log('喵一声');
	}
}
// // export { Animal };//具名导出

export default Animal;//默认导出,默认导出只能导出一次

//------------分割线-----
// let obj = {
// 	name: '5.1七天乐',
// 	age: 3,
// };
// export default obj;
//------------分割线-----
// export default  class Animal {
// 	constructor() {
// 		this.type = '动物';
// 	}
// 	sayHi() {
// 		console.log('喵一声');
// 	}
// }

