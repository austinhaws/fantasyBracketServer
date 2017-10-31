const cookieParser = require('cookie-parser')
const csrf = require('csurf');
const express = require('express');

const bodyParser = require('body-parser');
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


// app.get('/form', csrfProtection, function (req, res) {
// 	// pass the csrfToken to the view
// 	res.render('send', { csrfToken: req.csrfToken() })
// });
//
// app.post('/process', parseForm, function (req, res) {
// 	res.send('data is being processed')
// });

require('./routes')(app);

// set our port
const port = process.env.PORT || 8080;

// MYSQL SETUP
// =============================================================================
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: "localhost",
	database: 'fantasy',
	user: "root",
	password: "root"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Mysql connected!");
});

const person = require('./app/models/person');

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// !! order matters !!
router.use(function(req, res, next) {
	console.log('Something is happening...');
	next();
});

router.get('/', function (req, res) {
	res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
