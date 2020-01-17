const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const gparser = require('./middleware/gparser');

app.use(gparser({ extd: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index', (req, res) => {
	// console.log(req.zg);
	let buf = fs.readFileSync('./views/index.html');
	res.set('content-type', 'text/html');
	res.send(buf);
});

app.listen(3000, () => {
	console.log('服务器已启动');
});


// const express = require('express');
// const app = express();
// const fs = require('fs');
// const path = require('path');
// app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
// 	let buf = fs.readFileSync('./views/index.html');
// 	res.type('html');
// 	res.send(buf);
// });

// app.listen(3000, () => {
// 	console.log('已启动');
// })


