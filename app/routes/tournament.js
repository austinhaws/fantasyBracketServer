const tournament = require('../models/tournaments');
const jsonMessage = require('../system/messages/jsonMessages');

module.exports = function (router) {

	router.route('/tournament/current').get((req, res) => tournament.select(2018, tournaments => res.json(JSON.parse(tournaments[0].data).data)));

	router.route('/tournament/save').post((req, res) => tournament.update({
			year: req.body.year,
			data: req.body.data,
			tournament_pk: req.body.tournamentPk,
		}, () => jsonMessage.success(res)));


};
