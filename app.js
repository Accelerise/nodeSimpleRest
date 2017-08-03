var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),
	{
	  dotfiles: 'ignore',
	  etag: false,
	  extensions: ['htm', 'html'],
	  index: false,
	  maxAge: '1d',
	  redirect: false
	})
);

app.use('/', index);
app.use('/users', users);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  next(err);
});
app.use(clientErrorHandler);
app.use(errorHandler);

// catch 404 and forward to error handler

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send({ error: err.message });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {status:404,message:"Not Found"};
	res.render('error', { error: err });
}

module.exports = app;
