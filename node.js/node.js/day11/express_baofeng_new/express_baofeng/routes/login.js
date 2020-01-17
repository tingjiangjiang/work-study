var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/').get((req, res) => {
	res.render('login');
	console.log(req.sessionID);
});

module.exports = router;
