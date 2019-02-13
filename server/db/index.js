var mysql = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection(config);

var get = (cb) => {
	connection.query(
		`SELECT jdoc FROM reviews`, (err, res) => {
			if (err) {
				cb(err);
			} else {
				cb(res);
			}
	});
};

var post = (json, cb) => {
	connection.query(
		`INSERT INTO reviews VALUES ('${JSON.stringify(json)}')`, (err, res) => {
			if (err) {
				cb(err);
			} else {
				cb(res);
			}
	});
};

var deleteTable = (cb) => {
	connection.query(
		`DELETE FROM reviews`, (err, res) => {
			if (err) {
				cb(err);
			} else {
				cb(res);
			}
	});
};

module.exports = {
	get,
	post,
	deleteTable
};