/*
    require:引入
    exports：导出
    module.exports：导出
*/

// let A = require('./A');
// console.log(A);
// console.log(module);

let Tigger = require('./A');
console.log(Tigger);
let tigger = new Tigger();
tigger.sayHi();
