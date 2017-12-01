const picks = require('../models/picks');
const authentication = require('../system/security/authentication');
const pickService = require('../service/picks');

module.exports = function (router) {

	router.route('/person/current').get((req, res) => authentication.currentUser(req, user => res.json(user)));

	router.route('/person/picks').get((req, res) => authentication.currentUser(req, user => picks.select(user.uid, picks => res.json(picks.length ? picks[0] : '{}'))));

	router.route('/person/pick').post((req, res) => authentication.currentUser(req, user => picks.select(user.uid, userPicks => {
		if (!userPicks.length) {
			res.json({fail: 'no picks found, refresh and try again'});
		} else {
			const userPick = userPicks[0];
			const {fromGame, toGame} = req.body;
			pickService.makePick(userPick, fromGame, toGame);
			picks.update(userPick, () => res.json(userPick));
		}
	})));
};
