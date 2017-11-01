const person = require('../models/person');
const connection = require('../database/connection');

module.exports = function (router) {

	router.route('/person/current').get((req, res) => person.select(connection, 174989, person => res.json(person)));

	router.route('/person/save').post((req, res) =>
		person.update(connection, req.body.uid, {'first_name': req.body.firstName},
			updated => updated ? res.json({success: "success"}) : person.insert(connection, {first_name: req.body.firstName}, () => res.json({success: "success"}))));
};
