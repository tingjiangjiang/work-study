let fs = require('fs');
let paths = require('path');

// 创建目录(要逐层目录创建，不要一下构建大于1层的目录结构)
// fs.mkdir('./demo', err => {
// 	console.log(err);
// });
// 读取遍历目录
// fs.readdir('./', (err, files) => {
// 	console.log(err);
// 	console.log(files);
// });
// 删除空目录(删除非空目录有报错[目录不为空的错误])
// fs.rmdir('./demo', err => {
// 	console.log(err);
// });



// 递归删除非空目录
/*
    1、遍历、读取要操作的目录
    2、判断要删除的是目录还是文件（如果是文件则删除，如果是目录则进入该目录继续重复第一步的操作）
 */
function removeDir(path) {
	// 判断文件或目录是否存在
	if (fs.existsSync(path)) {
		let files = fs.readdirSync(path);
		files.forEach(val => {
			// path的join方法，用于路径组合拼接
			let file_path = paths.join(path, val);
			let fils_stat = fs.statSync(file_path);//文件类型
			// 如果是目录则递归遍历
			if (fils_stat.isDirectory()) {
				removeDir(file_path);
			} else {
				// 删除文件
				fs.unlinkSync(file_path);
			}
		});
		// forEach遍历结束，表明path目录下的文件被清空了，然后删除当前文件夹
		fs.rmdirSync(path);
	} else {
		//TODO SOMING
	}
}

removeDir('./demo');
