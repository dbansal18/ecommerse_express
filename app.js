var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var passport = require('passport');
var passportSetup = require('./config/passport-setup');
var mongoose = require('mongoose');
var keys = require('./config/keys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var addProductRoutes = require('./routes/admin/addProduct-routes');
var editProductRoutes = require('./routes/admin/editProduct-routes');
var authRoutes = require('./routes/user/auth-routes');
var profileRoutes = require('./routes/user/profile-routes');
var registerRoutes = require('./routes/user/register-routes');
var productsRoutes = require('./routes/products-routes');
var cartRoutes = require('./routes/cart-routes');

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// set up session cookies
app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('listning on port 3000');
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/register',(req,res,next)=>{
  if(req.user){
    res.redirect('/profile');
  }
  next();
} , registerRoutes);
app.use('/admin/uploadProduct', addProductRoutes);
app.use('/edit',(req,res,next)=>{
  if(req.user){
  if(req.user.role=='user') {
    res.redirect('/auth/logout');
  }}
  next();
}, editProductRoutes);
app.use('/products', productsRoutes); 
app.use('/cart',(req,res,next)=>{
  if(!req.user) res.redirect('/auth/login');
  next();}, cartRoutes);
// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});


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
