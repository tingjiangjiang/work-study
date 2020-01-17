let Db = require('./2、nodejs封装mongodb');

let db = new Db('student');
db.find('film', rst => {
	console.log(rst);
});
