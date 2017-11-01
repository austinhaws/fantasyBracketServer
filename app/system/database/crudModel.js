const connection = require('./connection.js');
const queryResults = require('./queryResults');
const convertKeys = require('convert-keys');
const snakeCase = require('lodash.snakecase');


/** generic crud for any table
 usage: crudModule('pick', 'employeeFk');  where 'pick' is the tablename and 'employeeFk' is lookup id field (not necessarily the auto generated pk field)
 returns an object and can add whatever custom queries you want to that object before exporting it from the model js file

 some tables like person use a look up key like uid but their actual pk is elsewhere like person_pk. the insertIdField is for setting that auto generated pk when it's not the same as idField

 ie.
 const crudModule = require('../system/database/crudModel');
 const pickQueries = crudModule('pick', 'employeeFk');
 pickQueries.report = (param1, param2, callback) => connection.query('DO SOME SQL FANCY ? STUFF ? HERE ?', [param1, param2, param2], callback);
 module.exports = pickQueries;
 */
module.exports = (tableName, idField, insertIdField) => {
	const model = {
		select: (id, callback) => connection.query(`SELECT * FROM ${tableName} WHERE ${snakeCase(idField)} = ?`, [id], queryResults.selectCallback(callback)),

		insert: (data, callback) => connection.query(`INSERT INTO ${tableName} SET ?`, convertKeys.toSnake(data), queryResults.insertCallback(id => {data[insertIdField ? insertIdField : idField] = id; callback(data);})),

		update: (data, callback) => connection.query(`UPDATE ${tableName} SET ? WHERE ${snakeCase(idField)} = ?`, [convertKeys.toSnake(data), data[idField]], queryResults.updateCallback(callback)),

		delete: (id, callback) => connection.query(`DELETE FROM ${tableName} WHERE ${snakeCase(idField)} = ?`, id, queryResults.deleteCallback(callback)),

	};

	model.replace = (data, callback) => model.update(data, numUpdated => numUpdated ? callback(data) : model.insert(data, callback));

	return model;
};
