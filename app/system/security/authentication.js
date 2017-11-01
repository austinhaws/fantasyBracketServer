const Person = require('../../models/person');

/*
	https://github.com/expressjs/session
	Warning The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.
		See: https://github.com/expressjs/session#compatible-session-stores
 */
const authentication = {
	currentUser: (req, callback) => {
		const currentUser = req.session.user;
		const uidHeader = req.header('uid');

		// if no header, log out out user and hose connection
		if (!uidHeader) {
			req.session.user = undefined;
			throw 'Header not set: uid';
		}

		// if user has changed, get new information
		if (!currentUser || currentUser.uid !== uidHeader) {
			req.session.user = undefined;
			Person.select(uidHeader, person => person ? callback(req.session.user = person[0]) : Person.insert(
				{
					uid: uidHeader,
					firstName: req.header('firstname'),
					lastName: req.header('lastname'),
					email: req.header('email'),
				}, person => callback(req.session.user = person)
			));
		} else {
			callback(req.session.user);
		}

	},
};

module.exports = authentication;
