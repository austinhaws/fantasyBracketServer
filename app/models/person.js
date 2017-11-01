const connection = require('../database/connection.js');

module.exports = {
	select: (connection, uid, callback) =>connection.query('SELECT * FROM person WHERE uid = ?', [uid], (err, results, fields) => callback(results[0])),

	insert: (connection, person) =>connection.query('INSERT INTO person SET ?', person),

	update: (connection, uid, person, callback) => {
		console.log('uid', uid);
		console.log('person', person);
		connection.query('UPDATE person SET ? WHERE uid = ?', [person, uid], callback)
	},
};
