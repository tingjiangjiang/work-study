// 核心模块和文件模块
// 核心模块：node提供的模块，可以认为是核心模块，核心模块的使用不要路径，写名字即可；核心模块一般是C++编写，效率高
// 文件模块：第三方引用的或自行编写的，可以认为是文件模块；文件模块有路径追踪，定位分析，加载编译等过程
/*
英文字母：

字节数 : 1;编码：GB2312

字节数 : 1;编码：GBK

字节数 : 1;编码：GB18030

字节数 : 1;编码：ISO-8859-1

字节数 : 1;编码：UTF-8

字节数 : 4;编码：UTF-16

字节数 : 2;编码：UTF-16BE

字节数 : 2;编码：UTF-16LE

 
中文汉字：

字节数 : 2;编码：GB2312

字节数 : 2;编码：GBK

字节数 : 2;编码：GB18030

字节数 : 1;编码：ISO-8859-1

字节数 : 3;编码：UTF-8

字节数 : 4;编码：UTF-16

字节数 : 2;编码：UTF-16BE

字节数 : 2;编码：UTF-16LE

8bit(位)=1Byte(字节)

1024Byte(字节)=1KB

1024KB=1MB

1024MB=1GB

1024GB=1TB
*/
let fs = require('fs'); //文件操作模块

// 一、文件操作
// 1、读文件
// 异步读文件
// fs.readFile('./诗词.txt', (err, data) => {
// 	console.log(err);
// 	console.log(data.toString());
// });
// 同步读
// let buf = fs.readFileSync('./诗词.txt');
// console.log(buf.toString());
// open打开文件的权限：
/*
    open打开的文件默认权限是0666
    mode参数：
    mode的权限组成(0,1,2,4)：
    第一位：必须是0
    第二位：规定文件或目录所有者的权限
    第三位：规定文件或目录所有者所属的分组的权限
    第四位：规定其他人的权限
    1表示：执行权限
    2表示：写权限
    4表示：读权限
    1+2+4 = 7 // 7表示文件或目录可读可写可执行 
    2+4 = 6 // 6表示文件或目录拥有读写权限
*/
fs.open('./诗词.txt', 'r', (err, fd) => {
	// fd是文件描述符（文件句柄，用来和指定的文件做对应的指针）
	// console.log(err, fd);
	let buf = new Buffer(100); //初始化一个buf，初始化一个缓冲区

	/*
        fd：文件描述符，一个文件的指针
        buffer：用来存储文件读取的指定内容的缓冲区
        offset：偏移量，从buffer的哪个字节开始写入读取的数据
        length：从文件中读取多长的数据
        position：从文件的第几个字节开始读取
    */
	fs.read(fd, buf, 3, 9, 3, (err, bytesRead, buffer) => {
		console.log(err);
		console.log(bytesRead);
		console.log(buffer);
		console.log(buffer.toString());
	});
});

// 2、写文件
// 二、目录操作
