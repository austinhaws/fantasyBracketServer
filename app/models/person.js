module.exports = {
	select: (connection, uid, callback) =>
		connection.query(
			'SELECT * FROM person WHERE uid = ?',
			[uid],
			(err, results, fields) => callback(results[0])),
};
