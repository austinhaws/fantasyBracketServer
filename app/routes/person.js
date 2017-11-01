const person = require('../models/person');
const jsonMessages = require('../system/messages/jsonMessages');

module.exports = function (router) {

	router.route('/person/current').get((req, res) => person.select(174989, person => res.json(person[0])));
};
