var express = require('express');
var Db = require('../db/db');
var router = express.Router();

// 强力推荐
function strongRecommend() {
	var p = new Promise((resolve, reject) => {
		let db = new Db('baofeng');
		db.pagination({
			collection: 'film',
			// query : {},
			// skip: 0,
			// limit: 5,
			sort: { grade: -1 },//排序
			success: rst => {
				let { data } = rst;
				// res.render('index', { data });
				resolve(data);
			},
			error: err => {
				// res.render('index');
				reject(err);
			},
		});
	});
	return p;
}
// 热映
function wellReceived() {
	var p = new Promise((resolve, reject) => {
		let db = new Db('baofeng');
		db.pagination({
			collection: 'film',
			// query : {},
			// skip: 0,
			// limit: 5,
			sort: { grade: -1 },
			success: rst => {
				let { data } = rst;
				// res.render('index', { data });
				resolve(data);
			},
			error: err => {
				// res.render('index');
				reject(err);
			},
		});
	});
	return p;
}

router.get('/', function(req, res, next) {
	Promise.all([strongRecommend()])
		.then(rst => {
			// console.log(rst);
			res.render('index', { data: rst[0] });
		})
		.catch(err => {
			// console.log(err);
			res.render('index');
		});
	// db.find('film', {}, rst => {
	// 	let { error_code, reason, data } = rst;
	// 	if (error_code == 0) {
	// 		console.log(data);
	// 		res.render('index', { data });
	// 	} else {
	// 		res.render('index');
	// 	}
	// });
});

module.exports = router;
