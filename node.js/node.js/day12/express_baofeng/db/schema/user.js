let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let userSchema = new Schema({
	username: {
		type: String, //约束类型为字符串
		required: true, //必填(新增的时候必填)
		unique: true, //不能重复（新增的数据不能重复，修改后的数据也不能重复）
		validate: {
			//自定义验证
			validator: v => {
				return /^1[35789]\d{9}$/.test(v);
			},
		},
	},
	password: {
		type: String,
		required: true,
		// validate: {
		// 	//自定义验证
		// 	validator: v => {
		// 		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/.test(v);
		// 	},
		// },
	},
});

module.exports = userSchema;
