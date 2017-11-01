const mysql = require('mysql');

const connection = mysql.createConnection({
	host: "localhost",
	database: 'fantasy',
	user: "root",
	password: "root"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Mysql connected!");
});

module.exports = connection;
