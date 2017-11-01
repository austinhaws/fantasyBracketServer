const person = require('../models/person');
const jsonMessages = require('./jsonMessages');

module.exports = function (router) {

	router.route('/person/current').get((req, res) => person.select(174989, person => res.json(person)));

	router.route('/person/save').post((req, res) => person.replace(req.body, () => jsonMessages.success(res)));
};
