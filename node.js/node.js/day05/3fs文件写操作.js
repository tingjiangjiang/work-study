var fs = require('fs');
// fs.writeFile('./诗词.txt', '床前明月光', err => {
// 	console.log(err);
// });

// buffer做第一个参数~~~
// let buf = new Buffer(10);
// fs.writeFile(buf, '床前明月光', err => {
//     console.log(err);
//     if (!err) {
//         console.log(buf.toString());
//     }
// });


// fs.writeFileSync('./诗词.txt', [1, 2]);
// fs.writeFileSync('./诗经.txt', '不可考证'); //当文件不存在的时候，会新建文件，文件存在的时候覆盖掉当前文件内容（覆盖写）

// fs.appendFileSync('./诗经.txt', '关关雎鸠');

// flag操作：
/*
    读：r
    覆盖写：w
    追加写：a
*/
