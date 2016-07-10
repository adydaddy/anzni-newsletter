var express = require('express')
  , bodyParser = require('body-parser')
  , articleDA = require('./services/articleDataAccess.js')
  , appRoutes = require('./routes/appRoutes.js')
  , config = require ('./configs/config.js')
  , fileUpload = require('express-fileupload');

var app = express()

app.use(bodyParser({uploadDir:'./uploads'}))
app.use(express.cookieParser());
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.static(__dirname + '/public'))
app.set('superSecret', config.secret); // secret variable
app.use(fileUpload());

appRoutes.registerAppRoutes(app);
appRoutes.registerApiRoutes(app);

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

app.listen(80)
