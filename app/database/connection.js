const mysql = require('mysql');

const connection = mysql.createConnection({
	host: "localhost",
	database: 'fantasy',
	user: "root",
	password: "root"
});

connection.connect(err => {
	if (err) {
		throw err;
	}
});

module.exports = connection;
