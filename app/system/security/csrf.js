const authentication = require('./authentication');
const guid = require('guid');

// very very simple csrf token
// could add timeout
// csrf session data { accountId: token: }
module.exports = {
	checkCsrf: (req) => {
		const csrf = req.session.csrf;
		if (!csrf || req.body[csrf.csrfName] !== csrf.csrfToken) {
			throw 'Invalid csrf token';
		}
	},
	getCsrf: (req, callback) => {
		authentication.currentUser(req, person => {
			const csrf = req.session.csrf;
			if (!csrf || csrf.personPk !== person.personPk) {
				req.session.csrf = {
					personPk: person.personPk,
					csrfToken: guid.create(),
					csrfName: 'fantasyCsrf',
				};
			}
			callback(req.session.csrf);
		});
	}
};
