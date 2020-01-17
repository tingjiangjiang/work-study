// // import { Animal, myName } from './Animal';
// import { myName } from './Animal';//具名导入
// import Animal from './Animal'; //默认导入

// // import { APPLE, BANANA } from './Interface';
// import * as Fruit from './Interface';

// class Tigger extends Animal {
// 	constructor() {
// 		super();
// 		this.title = '老虎';
// 	}
// 	say() {
// 		console.log('大老虎');
// 	}
// }
// console.log(myName);
// console.log(Fruit.APPLE);

// export { Tigger };


//----------练习-----
// import { Animal } from './Animal';//具名导入
//--------分割线--------
// import Animal from './Animal';//默认导入
// class Tigger extends Animal {
// 	constructor() {
// 		super();
// 		this.namess = '华南虎';
// 	}
// 	now() {
// 		console.log('待在动物园');
// 	}

// }
// import * as sanguo from './Interface';//as导入
// console.log(sanguo.dage);
// console.log(sanguo.erdi);
// console.log('==================');
// new Tigger().now();
// new Tigger().sayHi();
// console.log(new Tigger().namess);
// console.log(new Tigger().type);

//------------分割线-----
// import obj from './Animal';
// console.log(obj.age, obj.name);
//------------分割线-----
import animal from './Animal';//默认导入
class Tigger extends animal {
	constructor() {
		super();
		this.namess = '华南虎';
	}
	now() {
		console.log('待在动物园');
	}

}
new Tigger().now();
new Tigger().sayHi();
console.log(new Tigger().namess);
console.log(new Tigger().type);
export default Tigger;