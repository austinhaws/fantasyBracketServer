const LocalStrategy = require('passport-local').Strategy;
const Person = require('../models/person');

// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
module.exports = passport => {

	passport.serializeUser(function (person, done) {
		done(null, person.uid);
	});

	passport.deserializeUser(function (uid, done) {
		person.select(uid, person => done(false, person));
	});

	passport.use('local', new LocalStrategy({
			passReqToCallback: true
		},
		function (req, email, password, done) {
			process.nextTick(() => {
				Person.select(req.body.uid, person => {
					if (!person) {
						Person.replace(req.body.uid, req.body, personPk => done(null, Object.assign({personPk: personPk}, req.body)));
					}
				});
			});

		})
	);
};