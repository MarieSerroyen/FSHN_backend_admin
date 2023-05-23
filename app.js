const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require ('cors');
const config = require('config');

const usersRouter = require('./routes/api/v1/users');
const storeRouter = require('./routes/api/v1/stores');
const clothingRouter = require('./routes/api/v1/clothing');
const categoryRouter = require('./routes/api/v1/categories');
const subCategoryRouter = require('./routes/api/v1/subCategories');
const collectionRouter = require('./routes/api/v1/collections');
const cartRouter = require('./routes/api/v1/carts');


mongoose.connect(process.env.conn || config.get('database.conn'), {useNewUrlParser: true, useUnifiedTopology: true})
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/users', usersRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/clothing', clothingRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subCategories', subCategoryRouter);
app.use('/api/v1/collections', collectionRouter);
app.use('/api/v1/carts', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
