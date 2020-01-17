#Mongoose使用指南

## 一、概念介绍
mongoose作为mongodb的一个操作框架，使用起来非常便利，本文主要以一个案例的形式来介绍mongoose的用法，也会介绍一些mongodb中的常见操作。

熟悉关系型数据库的人都知道，关系型数据库中有这样几个概念：数据库，表，表记录和字段。mongodb作为一个NoSQL形式的非关系型数据库，它里面的概念不全是这样，下面我看看一下两者的对应关系：

MySQL-->MongoDb

数据库-->数据库

表-->collection

表记录-->document

字段-->无

## 二、数据库常用指令

所以在mongodb中进行增删改查操作并不像在mysql中一样；下面我们先来介绍几个mongodb常见的操作指令：

### 1、mongod -dbpath '数据库文件夹路径'

备注：mongodb的数据库以某一文件夹为基础，方便部署和使用，我们可以新建一个空的文件夹，然后使用上述命令新建一个mongodb的数据库，效果如下：

![mongod](./image/655C625A-1179-40C6-A8F0-E67E2086A1F3.png)

启动后mongo_test文件夹变化如下：

![mongod](./image/99C87FFE-BF16-485A-95AD-61228B790916.png)

需要注意的是mongod -dbpath '数据库文件夹路径' 指令不仅能新建一个库，也可以打开一个已有的库；也就是说该命令可以新建和打开数据库。

**可能遇到的问题：**打开数据库后的命令窗口最好不要关闭，否则可能意味着数据库服务被关闭，造成无法访问；也有可能系统会保留相关进程，造成后续打开或新建数据库的时候实际操作的还是该进程所代表的数据库；需要关闭数据库的时候可以在打开的数据库服务窗口中连续按两次ctrl + C终止；如果不小心关闭了命令窗口的同学，windows系统中可以在进程中找到mongod强制关闭，macos或linux的同学可以搜索关闭进程命令关闭。


### 2、mongoimport 

mongodb的数据存储形式并不像mysql那种，它是以一种bson的二进制json存储的，所以mongodb的CRUD操作会比较容易，因为数据已json展示的；如果需要将已有的json数据导入到mongodb数据库中，可以使用mongoimport命令，效果如下：

![mongoimport](./image/BC2DA08E-D87C-4383-94F9-16C6735FD76D.png)

其中，mongoimport 表示导入指令，-d 表示需要导入到哪个数据库中，如果数据库不存在则新建该数据库，-c 表示需要导入到数据库的那个集合(collection)中，如果集合不存在则新建该集合，--file 表示导入的json数据路径；关于导入数据到已有的有用户名和密码的数据库我们后面单独介绍。

**注意：**mongodb安装后其实存在这样几个文件:mongo,mongod,mongoimport,mongoexport,mongoump和mongorestore每个指令都是需要单独打开一个命令窗口运行的，不熟悉的人容易犯一个错误：在mongo命令窗口中数据mongoimport,mongoump等指令，这是错误的。

### 3、mongoexport 

mongoexport的操作基本和mongoimport相同，路径写出需要保存的文件路径即可，效果如下：

![mongoexport](./image/5480E621-121B-49DA-84A0-A22C0BD8AFC0.png)

注意：mongoimport 中的 --file需要换成-o,注意不是阿拉伯数字是字母o。



### 4、mongo

mongo命令算是一个mongodb的命令行客户端，用于连接mongodb数据库，新建一个命令行窗口，输入mongo回车即可进入客户端状态，效果如下：

![mongo](./image/FF71D481-0530-4308-9B09-EDD8FCAA3D15.png)

进入客户端后常见的指令有：

	show dbs;//显示所有的数据库
	use 数据库名称//数据库存在则切换至当前数据库，数据库不存在则新建，注意新建的数据库需要insert数据库才能显示，如果没有insert数据，则show dbs不会显示数据库
	
	db.getCollectionNames();//显示该数据库所有的集合
	

效果如下：

![mongo](./image/354CA4A3-1D15-4DCF-B835-D85E8FE3AD4F.png)

### 三、CRUD常用指令

本文中所有的CRUD指令以上文中的goods集合为基础。

#### 1、查询指令
	db.goods.find().pretty();
![find](./image/6B1D99C5-78D7-41C4-90AA-ADC78D21F1CF.png)
这里我们只演示最基本的情况，find是只查询，后面的pretty可以不用，只是美化的显示而已。至于复杂的查询等操作，我们在mongoose中展开介绍。

#### 2、新增指令
	
	db.goods.insert({name:'zhangsan',age:22})
	
![insert](./image/E4DFC0B5-41E6-4088-9799-6DADE332D924.png)

新增数据的查询结果：

![insert](./image/318C3EB2-8604-4F5A-8BCE-53F051847BCD.png)
	
#### 3、更新指令

	db.goods.insert({name:'张三'},{$set:{name:'lisi'}})
	
更新效果：
![update](./image/63D64173-C8AA-4983-A278-33B79461D07D.png)

#### 4、删除指令 

常规来说数据的删除应该以id为主要条件进行操作，但mongodb生成的id类型并不是字符串而是objectId类型，所以不好直接操作，这里演示一段借助mongoose操作删除的示例：

	const deleteDoc = function (db, callback) {
	    const goods = db.collection('goods');
	    var obj_id = mongoose.Types.ObjectId('58e7053c98dab115d336b3f8');
	    goods.deleteOne({
	        _id: obj_id,
	    }, function (err, result) {
	        console.log(err);
	        callback(result);
	    })
	}
	
**案例：**案例一


### 四、Mongoose介绍

#### 1、Schema

在mongodb中操作crud的时候我们不难发现一个问题，似乎并没有关系型数据库的表结构概念，这对于字段的约束，字段不能为空等操作来说是比较麻烦的；在mongoose中对collection的操作变得不一样，由schema和model共同组成。

其中schema主要用来描述collection的所谓的字段和字段的约束，model则继承自schema，主要进行crud操作。

首先我们来看一个简单的schema：

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	
	var blogSchema = new Schema({
	  title:  String,
	  author: String,
	  body:   String,
	  comments: [{ body: String, date: Date }],
	  date: { type: Date, default: Date.now },
	  hidden: Boolean,
	  meta: {
	    votes: Number,
	    favs:  Number
	  }
	});
	
在blogSchema中的每个键都定义了文档中的一个属性。每个键都将转换成与它关联的SchemaType。

允许的SchemaTypes有：

	String
	Number
	Date
	Buffer
	Boolean
	Mixed
	ObjectId
	Array
	Decimal128
	Map
	
#### 2、model

上面我们已经说过model是schema的子类，主要进行crud操作，可以用model类操作，也可以用model实例进行操作，我们主要演示使用model类操作的情况：

	const mongoose = require("mongoose");
	const url = "mongodb://localhost:27017/mongo";
	let Schema = mongoose.Schema;
	let goodsSchema = new Schema({
	  "productId": String,
	  "productName": String,
	  "salePrice": Number,
	  "productImage": String,
	  "productUrl": String
	});
	
	mongoose.connect(url, function (err) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	  console.log('连接已打开');
	  let goods = mongoose.model("good", goodsSchema);
	
	  goods.find({}, ['productId'], function (err, res) 	  {
	       console.log(res);
	  });
	});
	
mongoose.model("good", goodsSchema);中的good表示要进行操作的collection名字；如果使用mongoose新建数据库和集合文件，则数据库中显示为复数，实际model中操作为单数，比如我们写了good，但数据库中实际显示为goods.

这句代码的返回并不是创建一个实例，而是创建一个类。该类在进行crud操作的时候，可用函数非常多，常用的有：

	Model.count()
	<!--count：select count(*) from table-->
	Model.deleteMany()
	<!--deleteMany:delete from table where ...-->
	Model.distinct()
	<!--select distinct(name) from table where ...-->
	Model.find()
	<!--select id,name,age from table where ...-->
	Model.findById()
	<!--select * from table where id = 'XXX'-->
	Model.findOne()
	<!--select * from table where ... limit 1-->
	Model.insertMany()
	<!--insert into table(name,age) values('zhangsan',22),('lisi',20)-->
	Model.populate()
	<!--populate主要用于多表查询，类似于mongodb中的lookup-->
	Model.updateMany()
	<!--update table set name='XX',age='XX' where ...-->
	
#### 3、conection

常用的连接语句如下：

	mongoose.connect('mongodb://localhost:port/database');
	mongoose.connect('mongodb://username:password@host:port/database');
	
**案例:**案例二

#### 4、validation验证器

验证器是用来验证schemaType的，使用场景是，我们在schema中定义了一些字段和类型，实际新增内容的时候如果不符合已定义的类型或类型的验证器规则，将报错。这可以理解为一种约束机制。

required：所有的schemaType都有required 验证器，该属性表示必填。

min,max：所有的number类型都有min和max验证器，用于给出number类型的上限和下限。

enum,minlength,maxlength：所有的string类型都有这些验证器，其中minlenght和maxlength好理解，表面最小和最大长度，enum是枚举器，用来枚举字符串内容的可能性，如下：enum : ['苹果','桃子']；那么字符串内容只能为苹果或桃子，其他内容都将报错。

unique：相当于关系型数据库的唯一约束，设定完毕后要重启数据库生效。

validate：这相当于是自定义验证器，用于自己定义验证的规则（正则字符串），使用效果如下：

	validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      }
    }

**案例：**案例三

#### 5、populate

如果schema之间存在关联关系，比如关系型数据库的多表查询操作，在mongoose中可以使用populate类解决。

比如我们有一个类别schema（它没有依赖其他schema）：

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	module.exports = {
	  _id: {
	    // type: 'ObjectId',
	    type: Schema.Types.ObjectId
	  },
	  cname: {
	    type: String,
	    required: true,
	    unique: true
	  },
	  imageUrl: {
	    type: String,
	    validate: {
	      validator: function (v) {
	        return /^.+(.jpg|.png|.jpeg)$/.test(v);
	      },
	    },
	  },
	  brief: {
	    type: String
	  }
	}
	
我们还有一个用户schema（它也没有依赖其他schema）：

	module.exports = {
	  _id: {
	    type: 'ObjectId'
	  },
	  username: {
	    type: String,
	    required: true,
	    unique: true
	  },
	  pwd: {
	    type: String,
	    minlength: 6,
	    maxlength: 12,
	    required: true
	  },
	  avatar: {
	    type: String,
	    validate: {
	      validator: function (v) {
	        return /^.+(.jpg|.png|.jpeg)$/.test(v)
	      }
	    }
	  },
	  sex: {
	    type: String,
	    enum: ['男', '女']
	  },
	  city: {
	    type: String
	  },
	  birthday: {
	    // type: Date
	    type: String,
	    validate: {
	      validator: function (v) {
	        return /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(
	          v
	        ) //2018-12-17
	      }
	    }
	  },
	  brief: {
	    type: String
	  },
	  phone: {
	    type: String,
	    required: true,
	    validate: {
	      validator: function (v) {
	        return /^1[34578]\d{9}$/.test(v)
	      }
	    }
	  }
	}
现在我们有一个内容schema（它需要依赖类别和用户）：

	module.exports = {
	  _id: {
	    type: 'ObjectId',
	  },
	  uid: {
	    type: 'ObjectId',
	    ref: 'user',
	    required: true
	  },
	  cid: {
	    type: 'ObjectId',
	    ref: 'classify',
	    required: true
	  },
	  imageUrl: {
	    type: String,
	    validate: {
	      validator: function (v) {
	        return /^.+(.jpg|.png|.jpeg)$/.test(v);
	      },
	    },
	    required: true
	  },
	  brief: {
	    type: String
	  },
	  datetime: {
	    type: String,
	    validate: {
	      validator: function (v) {
	        return /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])\s(0[0-9]|[1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(
	          v
	        )
	      }
	    }
	  },
	  look: {
	    type: Number,
	    min: 0,
	    default: 0
	  },
	  like: {
	    type: Number,
	    min: 0,
	    default: 0
	  },
	  title: {
	    type: String,
	    required: true
	  }
	}
	
实际的依赖关系如下：

	uid: {
	    type: 'ObjectId',
	    ref: 'user',
	    required: true
	  },
	  cid: {
	    type: 'ObjectId',
	    ref: 'classify',
	    required: true
	  }
需要增加ref字段，ref的值为所依赖的**model**名字，千万不要写成schema的名字；所以这个ref的名字就需要和model使用时候的：

	module.exports = mongoose.model('classify', schema);

名字保持一致，大家都要叫做classify,至于依赖的用户schema也是如此。

这样在schema中设定完毕后，查询的时候是不是就直接有了相关集合的内容了呢？不会的。因为这只是相当于:

	select * from table

如果要达到:

	select * from table a left join talbe1 b on a.uid = b.uid left join table2 c a.cid = c.cid
	
这样的结果，还需要单独设置populate才行。如下示例：

	Story.
	  findOne({ title: 'Casino Royale' }).
	  populate('author').
	  exec(function (err, story) {
	    if (err) return handleError(err);
	    console.log('The author is %s', story.author.name);
	    // prints "The author is Ian Fleming"
	  });

populate中如果只存在一个字段则表明需要链接的model名字，如果有多个model需要链接，不可以写成populate('author','other')或populate(['author','other'])形式；正确的写法是：

	Story.
		  findOne({ title: 'Casino Royale' }).
		  populate('author').
		  populate('other').
		  exec(function (err, story) {
		    if (err) return handleError(err);
		    console.log('The author is %s', story.author.name);
		    // prints "The author is Ian Fleming"
		  });

如果还有更多的依赖或者需要写成动态的效果该怎么处理？详见综合案例。

populate还支持一些其他的参数行为，如下：

	Story.
	  find(...).
	  populate({
	    path: 'fans',
	    match: { age: { $gte: 21 }},
	    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
	    select: 'name _id',
	    options: { limit: 5 }
	  }).
	  exec();

path：需要链接的model名字

match：指定除_id主键外的其他链接条件

select：链接model中需要检索的字段，以空格隔开，不指定默认全部

options：用于指定limit，sort和skip等参数行为。

我们简单介绍一下这些参数，这并不是我们要说的重点，详细参考官方文档：<a href="https://mongoosejs.com/docs/populate.html">mongoose populate</a>


##### 6、链式查询exec和回调

	回调：
	Person.find({},function(err,res){
		callback(err,res);
	})
	
	链式查询：
	Person.
	  find({ occupation: /host/ }).
	  where('name.last').equals('Ghost').
	  where('age').gt(17).lt(66).
	  where('likes').in(['vaporizing', 'talking']).
	  limit(10).
	  sort('-occupation').
	  select('name occupation').
	  exec(callback);

这两种写法的优劣和功能扩展性相比一目了然，我推荐的做法是简单的操作就使用回调函数的写法，复杂的查询使用链式查询的写法，需要注意的是回调的形式之后不能再有其他链式操作。我们在综合案例中都将演示到这些。

案例：综合案例

**备注：**综合案例是经过封装的，所以需要一些耐心去学习。


### 五、数据库权限管理

数据库查询的权限管理直接参考另外一篇教程：mongodb创建用户
需要远程连接测试的同学，可以远程我的主机地址:39.106.185.211,数据库名字：huaban

**参考文档：**

https://www.jianshu.com/p/79caa1cc49a5
https://mongoosejs.com/docs/queries.html
