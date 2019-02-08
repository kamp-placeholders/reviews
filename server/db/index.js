var mysql = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection(config);

var get = (cb) => {
	connection.query(
		`SELECT jsdoc FROM stuff`, (err, res) => {
			if (err) {
				cb(err);
			} else {
				cb(res);
			}
	});
};

var post = (json, cb) => {
	connection.query(
		`INSERT INTO stuff VALUES ('${JSON.stringify(json)}')`, (err, res) => {
			if (err) {
				cb(err);
			} else {
				cb(res);
			}
	});
};

var deleteTable = (cb) => {
	connection.query(
		`DELETE FROM stuff`, (err, res) => {
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