var express = require('express');
var Db = require('../../db/db');
var router = express.Router();

let db = new Db('baofeng');
function filmCount() {
	var p = new Promise((resolve, reject) => {
		db.count('film', {}, rst => {
			let { error_code, data } = rst;
			if (error_code == 0) {
				resolve(data);
			} else {
				reject(0);
			}
		});
	});
	return p;
}
function filmData(page) {
	/*
		skip	0	5	10	15
		page	1	2	3	4
	*/
	let skip = (page - 1) * 5; //根据页码计算skip值
	var p = new Promise((resolve, reject) => {
		db.pagination({
			collection: 'film',
			skip,
			limit: 5,
			success: rst => {
				resolve(rst.data);
			},
			error: error => {
				reject([]);
			},
		});
	});
	return p;
}

/* GET home page. */
router.get('/:page?', function(req, res, next) {
	let { page = 1 } = req.params;
	Promise.all([filmCount(), filmData(page)])
		.then(rst => {
			let count = rst[0];
			let pages = Math.ceil(count / 5);
			let currpage = page;
			res.render('admin_list', { currpage, count, pages, films: rst[1] });
		})
		.catch(error => {
			res.render('admin_list', { count: 0, films: [] });
		});
	//
});
router.get('/deletefilm/:currpage/:id', (req, res) => {
	// currpage是客户端传递上来的当前页，默认为1
	let { currpage = 1, id } = req.params;

	db.delete('film', { _id: id }, rst => {
		filmCount()
			.then(rst => {
				let pages = Math.ceil(rst / 5);
				currpage = currpage > pages ? pages : currpage;
				// 最后一页的最后一个数据删除后，currpage或变成0，
				if (currpage == 0) currpage = 1;
				res.redirect(`/admin/list/${currpage}`);
			})
			.catch(error => {
				res.redirect(`/admin/list/1`);
			});
	});
});
module.exports = router;
