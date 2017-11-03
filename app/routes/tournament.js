const tournament = require('../models/tournament');
const jsonMessage = require('../system/messages/jsonMessages');

module.exports = function (router) {

	router.route('/tournament/current').get((req, res) => tournament.select(2018, tournaments => res.json(tournaments[0])));
	router.route('/tournament/save').post((req, res) => tournament.update({
			year: req.body.year,
			data: req.body.data,
			tournament_pk: req.body.tournamentPk,
		}, () => jsonMessage.success(res)));


};
