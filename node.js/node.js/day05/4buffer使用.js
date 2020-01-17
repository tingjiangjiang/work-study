// 重要！！！！buffer在nodejs中是一个全局变量,使用它不需要引入任何模块

// let buf = new Buffer(); //报错，buffer初始化需要填入参数：参数可以是number,string,Array
// 1、以number类型初始化，指定buffer的长度（字节单位）,buffer的长度一旦固定，就无法自行修改（不会随着内容的增加或减少，动态的改变buffer的长度）
// let buf = new Buffer(10);
// let buf = new Buffer.alloc(10);
// console.log(buf);

// 2、以array类型初始化(数组在初始化buffer的时候，数组中的内容应该为number类型或可以转换为number类型的内容)
// let buf = new Buffer(['2', 'hello', true, '张三']);
// console.log(buf);

// 3、以字符串类型初始化（buffer和字符串互转）

// let buf = new Buffer('国庆');
// let buf = new Buffer('70国庆大阅兵');
// console.log(buf.toString());

// 4、buffer的length属性
// let buf = new Buffer('70国庆大阅兵'); //17个字节
// console.log(buf.length);

// 5、对象和buffer的互转
// let obj = {
// 	name: '张三',
// 	age: 22,
// };
// let obj_str = JSON.stringify(obj);
// let buf = new Buffer(obj_str);
// let tmp = JSON.parse(buf.toString());
// console.log(tmp);

// 6、buffer的concat功能:nodejs中的文件读写和网络请求响应等操作使用的都是buffer；但是，异步读取的时候不一定能够一次性完成，这时候需要使用buffer的concat来拼接。
// let buf1 = new Buffer('红buf');
// let buf2 = new Buffer('蓝buf');

// let buf = Buffer.concat([buf1, buf2]);
// console.log(buf.toString());

// Buffer.isEncoding()判断当前编码格式是否支持
