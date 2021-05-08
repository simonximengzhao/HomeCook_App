const config = require('./config.json');
var express = require('express')
var path = require('path');
const cors = require('./routes/cors');
var searchRouter = require('./routes/searchRouter');
var usersRouter = require('./routes/users');
var passport = require('passport');
var favoriteRouter = require('./routes/favoriteRouter');
var commentRouter = require('./routes/commentRouter');

// set-up mongoose
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const url = config['mongoUrl'];
const connect = mongoose.connect(url);

// connect to mongoDB
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(express.json());

// set up passport
app.use(passport.initialize());

// serve static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/api/images', express.static('images'));

// set up routers
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/favorites', favoriteRouter);
app.use('/comments',commentRouter);

// ping
app.route('/ping')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res) => {
    res.send('OK');
});

var server = app.listen(config["port"], () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});

  module.exports = app;