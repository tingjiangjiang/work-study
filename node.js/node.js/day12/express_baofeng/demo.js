let Db = require('./db/db');

function userValid(username, password) {
	var p = new Promise((resolve, reject) => {
		console.log('count');
		let db = new Db('baofeng');
		db.count('user', { username, password }, rst => {
			let { error_code, reason, data } = rst;
			// 0表示账号不存在
			if (data == 0) {
				resolve();
			} else {
				// 否则账号已存在
				reject({ error_code: 105, reason: '账号已存在', data: null });
			}
		});
	});
	return p;
}
function userInsert(username, password) {
	var p = new Promise((resolve, reject) => {
		console.log('insert');
		let db = new Db('baofeng');
		db.insert('user', { username, password }, rst => {
			let { error_code, reason, data } = rst;
			if (error_code == 0) {
				resolve({ error_code: 0, reason: '注册成功', data: { username, password } });
			} else {
				reject({ error_code, reason, data });
			}
		});
	});
	return p;
}

// Promise.all([userValid('18658812238', 'asdfE123'), userInsert('18658812238', 'asdfE123')])
// 	.then(rst => {
// 		console.log(rst);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

// userValid('18658812239', 'asdfE123')
// 	.then(rst => {
// 		console.log(rst);//强力推荐
// 		return userInsert('18658812239', 'asdfE123');
// 	})
// 	.then(rst => {
// 		console.log(rst);//热映
// 		最终渲染
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});
