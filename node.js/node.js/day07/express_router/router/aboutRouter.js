let express = require('express');
let fs = require('fs');
let router = express.Router();

router.route('/about').get((req, res) => {
    let buf = fs.readFileSync('./views/about.html');
    res.type('html');
    res.send(buf);
}).post((req, res) => {
    res.send('咕咕');
});

module.exports = router;