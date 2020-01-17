let path = require('path');

// path
/*
    extname 获取后缀
    join    路劲拼接
    dirname 针对当前传入的路径，向上取一级
    basename    获取路径的中的最后一段,可以指定第二个参数（ext后缀），来忽略掉文件的后缀
    resolve 获取绝对路径
    relative    获取to相对于from的路径
*/

// console.log(path.dirname(__dirname));
// console.log(path.dirname(__filename));

// let r = path.resolve('./路由介绍.txt');

// let r = path.resolve('./静态资源/public', './app.css');
// let r = path.resolve('./静态资源/public', '../app.css');
// let r = path.resolve('./静态资源/public', 'app.css');
// let r = path.resolve('./静态资源/public', '/app.css');
// console.log(r);

let r = path.relative('./静态资源/public/css/app.css', './静态资源/public/image/timg.jpg');
console.log(r);

// basename
// console.log(path.basename(__dirname));
// console.log(path.basename(__filename));
// let b = path.basename('/静态资源/public/css/app.css');
// let b = path.basename('/静态资源/public/css/app.css', '.css');
// console.log(b);
