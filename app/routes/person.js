const picks = require('../models/picks');
const authentication = require('../system/security/authentication');

module.exports = function (router) {

	router.route('/person/current').get((req, res) => authentication.currentUser(req, user => res.json(user)));
	router.route('/person/picks').get((req, res) => authentication.currentUser(req, user => picks.select(user.personPk, picks => res.json(picks.length ? JSON.parse(picks[0].picks) : '[]'))));
};
