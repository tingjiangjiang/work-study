import './css/unit.css';
import './less/app.less';
import './font-awesome-4.7.0/css/font-awesome.css';
import { Tigger } from './js/Tigger';

let tigger = new Tigger();
console.log(tigger.type);
console.log(tigger.title);
tigger.say();

/*
class Animal {
	constructor() {
		this.type = '动物';
	}
}

class Tigger extends Animal {
	constructor() {
		super();
		this.name = '东北虎';
	}
}

let tigger = new Tigger();
console.log(tigger.type);
console.log(tigger.name);
*/
