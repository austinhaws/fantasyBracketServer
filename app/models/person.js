const connection = require('../database/connection.js');
const queryResults = require('../database/queryResults');
const convertKeys = require('convert-keys');

const person = {
	select: (uid, callback) => connection.query('SELECT * FROM person WHERE uid = ?', [uid], queryResults.selectCallback(callback)),

	insert: (data, callback) => connection.query('INSERT INTO person SET ?', convertKeys.toSnake(data), queryResults.insertCallback(callback)),

	update: (data, callback) => connection.query('UPDATE person SET ? WHERE uid = ?', [convertKeys.toSnake(data), data.uid], queryResults.updateCallback(callback)),
};

person.replace = (data, callback) => person.update(data, numUpdated => numUpdated ? callback(data) : person.insert(data, callback));

module.exports = person;
