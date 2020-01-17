const mongoose = require('mongoose');

// mongodb://127.0.0.1:27017
mongoose.connect('mongodb://127.0.0.1:27017/student', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
	if (err) {
		console.log('连接失败');
	} else {
		// mongoose里面不同于mongdb
		// mongodb使用的是db和collection
		// mongoose使用的是schema和model
		// mongodb对数据库的操作没有数据验证功能，mongoose增加了数据验证功能
		// mongoose用起来更像是关系型数据库，增加了数据字段验证能力，通过定义schema来约束和规范数据格式（也就是说在新增数据的时候需要符合schema定下来的字段或字段的验证，否则无法成功）

		// 所谓的model模型就是集合，movie的意思是操作的集合名称
		// model的第二个参数是schema，用来约束要操作的movie集合,如果操作的字段不符合schema规范，则报错
		// 重要!!!! 通过mongoose操作数据库的时候集合名字会自动变复数

		let Schema = mongoose.Schema;
		let movieSchema = new Schema({
			name: {
				type: String,
				unique: true,
				default: '王五', //默认值
			},
			age: Number,
			address: Schema.Types.String,
			// _id: Schema.Types.ObjectId,
			phone: {
				type: Number, //约束类型为字符串
				required: true, //必填
				unique: true, //不能重复
				validate: {
					//自定义验证
					validator: v => {
						return /^1[35789]\d{9}$/.test(v);
					},
				},
			},
		});
		let movieModel = mongoose.model('movie', movieSchema);
		movieModel.insertMany({ age: '22', address: 'beijing', phone: '13567651231' }, (error, doc) => {
			console.log(error, doc);
		});

		// movieModel.find({}, (err, result) => {
		// 	console.log(err, result);
		// });
		// 根据id查询
		// movieModel.findById('5d887d5331d8b81d8041bed6', (err, res) => {
		// 	console.log(err, res);
		// });
		// 查询数量
		// movieModel.count({}, (err, count) => {
		// 	console.log(count);
		// });

		// 查询数据库中过滤后的name字段（过滤重复项）
		// movieModel.distinct('name', {}, (err, res) => {
		// 	console.log(err, res);
		// });
		/*
            公告:[{},{},...]
            招聘
            简介
            联系
            产品:[{},{},{}...]

            {
                gonggao : [{},{},{}],
                zhaopin: [],
                jianjie:[{},{},{}...]
            }
        */
		// db.movie.insert({name:'zhangsan',address:'北京'})
	}
});
