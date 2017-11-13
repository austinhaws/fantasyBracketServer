const tournaments = require('../models/tournaments');
const jsonMessage = require('../system/messages/jsonMessages');

module.exports = function (router) {

	router.route('/tournament/current').get((req, res) => tournaments.select('2018', tournaments => res.json(tournaments[0])));

	router.route('/tournament/save').post((req, res) => tournaments.update(req.body, () => jsonMessage.success(res)));
};
