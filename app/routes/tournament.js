const tournament = require('../models/tournament');

module.exports = function (router) {

	router.route('/tournament/current').get((req, res) => tournament.select(2018, tournament => res.json(tournament)));

};
