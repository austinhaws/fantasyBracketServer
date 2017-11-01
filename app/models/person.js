const crudModule = require('../system/database/crudModel');
const convertKeys = require('convert-keys');
const queryResults = require('../system/database/queryResults');

const crud = crudModule('person', 'uid');

// use `uid` to lookup people from header, but `person_pk` is the actual id column
crud.insert = (data, callback) => connection.query(`INSERT INTO person SET ?`, convertKeys.toSnake(data), queryResults.insertCallback(callback, 'personPk'));

module.exports = crud;
