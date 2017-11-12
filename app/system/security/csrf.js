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
		// don't pass csrf forward so that it doesn't end up in mongo store
		delete req.body[csrf.csrfName];
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
