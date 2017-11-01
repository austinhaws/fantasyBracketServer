const cookieParser = require('cookie-parser')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const router = express.Router();
require('./app/routes')(router);
app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port);
