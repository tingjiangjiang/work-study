let fs = require('fs');

// let readStream = fs.createReadStream('./video.flv');
// let arr = [];
// readStream.on('open', fd => {
// 	console.log('文件已打开');
// });
// readStream.on('data', data => {
// 	arr.push(data);
// });
// readStream.on('end', () => {
// 	let video = Buffer.concat(arr);//Buffer.concat拼接数组
// 	fs.writeFile('./vv.flv', video, err => {
// 		console.log(err);
// 	});
// });
// readStream.on('error', err => {
// 	console.log('错误了');
// });
// readStream.on('close', () => {
// 	console.log('文件已关闭');
// });

// 通过文件的流操作一边读一边写
// let readStream = fs.createReadStream('./video.flv');
// let writeStream = fs.createWriteStream('./vv.flv');

// readStream.on('data', data => {
// 	writeStream.write(data);
// });
// readStream.on('end', () => {
// 	writeStream.end();
// });

let writeStream = fs.createWriteStream('./宋词.txt');
writeStream.write('苏东坡');
// writeStream.end('白居易');
writeStream.write('同是天涯沦落人，相逢何必曾相识');
writeStream.write('主人下马客在船，举酒欲饮无管弦');
writeStream.end();
// writeStream流可以注册finish事件来监听写入是否完毕
writeStream.on('finish', () => {
    console.log('写入完毕');
});

// 重要！！！end调用就结束了，end后不要有write和end操作，会报错，end的参数可以为空（但是end必须要写）

// pipe管道操作

// let readStream = fs.createReadStream('./video.flv');
// let writeStream = fs.createWriteStream('./vv.flv');
// // 管道操作
// readStream.pipe(writeStream);
