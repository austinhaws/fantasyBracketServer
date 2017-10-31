// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;

// MYSQL SETUP
// =============================================================================
var mysql = require('mysql');

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
person.select(connection, 174989, person => console.log(person));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// !! order matters !!
router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.route('/user/current').get((req, res) => person.select(connection, 174989, person => res.json(person)));

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
