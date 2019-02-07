var mysql = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection(config);

var get = (cb) => {
	connection.query(`SELECT * FROM stuff`, (err, res) => {
		cb(res);
	})
}

module.exports = {
	get
};