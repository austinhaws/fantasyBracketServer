const cookieParser = require('cookie-parser')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');
const session = require('express-session');
const authentication = require('./app/system/security/authentication');

app.use(helmet());
app.use(session({secret: 'fantasybracketrockslikecasey!', resave: true, saveUninitialized: true,}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const router = express.Router();

router.use((req, res, next) => authentication.currentUser(req, () => next()));


require('./app/routes')(router);
app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port);

console.log('Lisenting on port:' + port);