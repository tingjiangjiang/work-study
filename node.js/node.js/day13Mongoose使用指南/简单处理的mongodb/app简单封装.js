var Client = require('mongodb').MongoClient;

class Db {
	constructor() {}
	connect() {
		var url = 'mongodb://127.0.0.1:27017';
		var mongo = new Client(url, { useNewUrlParser: true });
		var p = new Promise((resolve, reject) => {
			mongo.connect((err, MongoClient) => {
				if (err) {
					reject(err);
				} else {
					var db = MongoClient.db('baofeng');
					var collection = db.collection('films');
					resolve(collection);
				}
			});
		});
		return p;
	}
	find() {
		this.connect()
			.then(res => {
				res.find();
			})
			.catch(err => {});
	}
	insert() {}
	update() {}
	delete() {}
}
