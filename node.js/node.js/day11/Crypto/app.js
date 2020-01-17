//密码加密
let crypto = require('crypto');
// HASH
// let md5 = crypto.createHash('md5'); //md5,sha1,sha256
// md5.update('asdfE123'); //给md5输入加密的值
// // md5.update('how');
// let md5_o = md5.digest('hex'); //输出md5加密后的内容
// console.log(md5_o);

// HAMC
let md5 = crypto.createHmac('md5', 'baofeng');
md5.update('helloworld');//updata:更新
let md5_o = md5.digest('hex');//digest:消化 hex:16进制
console.log(md5_o);
