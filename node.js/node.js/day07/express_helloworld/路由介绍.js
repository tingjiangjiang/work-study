const express = require('express');
const app = express();
let fs = require('fs');

app.get('/', (req, res) => {
	let buf = fs.readFileSync('./views/index.html');
	res.end(buf);
});
app.post('/', (req, res) => {
	res.end('success');
});
app.get('/about', (req, res) => {
	let buf = fs.readFileSync('./views/about.html');
	res.end(buf);
});
app.get((req, res) => {
	let buf = fs.readFileSync('./views/error.html');
	res.end(buf);
});

app.listen(3000, () => {
	console.log('服务器已启动');
});
