var redis = require("redis");

  var client = redis.createClient();

client.on("error", function (err) {

 console.log("Error " + err);

});

client.on('connect', function(){

 console.log('Redis连接成功.');

})

client.on('end', function(){

 console.log('Redis关闭.');

})

var name = 'test name';

client.set(name, 'test value', function(err,result){

if (err) {

console.log(err);

return;

}

console.log('插入数据结果:',result);

//过期时间,单位秒

client.expire(name,60);

})

client.get(name, function(err,result){

if (err) {

console.log(err);

return;

}

console.log("查询结果 :",result);

});