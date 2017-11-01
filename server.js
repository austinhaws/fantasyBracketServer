const cookieParser = require('cookie-parser')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
require('./app/config/passport')(passport);
const jsonMessages = require('./app/routes/jsonMessages');

app.use(helmet());

function isLoggedIn(req, res, next) {
	return next();
	if (req.isAuthenticated()) {
		return next();
	}
	return jsonMessages.error(res, 'Not logged in');
}

app.use(session({secret: 'fantasybracketrockslikecasey!', resave: true, saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const router = express.Router();

router.use(function (req, res, next) {
	// check for header
	console.log('Something is happening.');
	// passport.authenticate('local')(req, res, () => isLoggedIn(req, res, next));
	return next();
});


require('./app/routes')(router, passport);
app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port);
