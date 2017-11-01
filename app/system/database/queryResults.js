const convertKeys = require('convert-keys');

const queryResults = {
	// throw an error if there was one
	checkError: err => {
		if (err) {
			throw err;
		}
	},

	selectCallback: callback => (err, results, fields) => {
		queryResults.checkError(err);
		if (callback) {
			callback(results.map(r => convertKeys.toCamel(r)), fields);
		}
	},

	updateCallback: callback => (err, results, fields) => {
		queryResults.checkError(err);
		if (callback) {
			// "changedRows" differs from "affectedRows" in that it does not count updated rows whose values were not changed.
			callback(results.affectedRows, results.changedRows);
		}
	},

	insertCallback: (callback, idField) => (err, results, fields) => {
		queryResults.checkError(err);
		if (callback) {
			if (results.affectedRows === 1) {
				results[0][idField] = results.insertId;
			}
			callback(results);
		}
	},
};
// delete is the same as update
queryResults.deleteCallback = queryResults.updateCallback;

module.exports = queryResults;