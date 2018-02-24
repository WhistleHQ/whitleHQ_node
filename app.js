var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var mailer = require('./routes/mailer');

var app = express();

const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  dkim: {
    privateKey: fs.readFileSync('./nopeload/whistlehq.com.pem', 'utf8'),
    keySelector: 'therewillbepeace._domainkey'
  },
  silent: false
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post('/sendmail', function(req, res, next){

	sendmail({
	    from: 'no-reply@whistlehq.com',
	    to: req.body.email,
	    subject: req.body.sub,
	    html: req.body.content
	  }, function(err, reply) {
	    console.log(err && err.stack);
	    console.dir(reply);
	});

	res.send('we shall try to find the email.');

	console.log(req.body);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
