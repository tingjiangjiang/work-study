let express = require('express');
// let path = require('path');
let fs = require('fs');

let router = express.Router();

// router.get('/', (req, res) => {
// 	// let rpath = path.resolve('./views/index.html');
// 	// console.log(rpath);
// 	// let buf = fs.readFileSync(rpath);
// 	// ./views的路径指的是app相对于views目录的路径
// 	let buf = fs.readFileSync('./views/index.html');
// 	res.type('html');
// 	res.send(buf);
// });
// router.post('/', (req, res) => {
// 	res.send('post');
// });

router
	.route('/')
	.get((req, res) => {
		let buf = fs.readFileSync('./views/index.html');
		res.type('html');
		res.send(buf);
	})
	.post((req, res) => {
		res.send('post');
	});
//子级路由
router.get('/user', (req, res, next) => {
	res.send('user');
	let err = new Error('子级 没有页面');
	next(err);
});

module.exports = router;

// let express = require('express');
// let fs = require('fs');
// let router = express.Router();

// router.route('/').get((req, res) => {
// 	let buf = fs.readFileSync('./views/index.html');
// 	res.type('html');
// 	res.send(buf);
// }).post((req, res) => {
// 	res.send('鸟');
// });

// module.exports = router;





