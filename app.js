var express = require("express"),
	mysql      = require('mysql'),
	bodyParser = require('body-parser'),
	jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
	db			= require('./db');

var app = express();
var appRouter = express.Router(); 
var port = process.env.PORT || 8081;

// parse application/json
app.use(bodyParser.json());
app.set('superSecret', 'key-secret');
// the token
// eyJhbGciOiJIUzI1NiJ9.YXJkYWxs.AYUGF1q-2JaFdlcTeBkZw_8ChmYiRQFd0Ct9mQ7KoT0

// route middleware to verify a token
appRouter.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });    
  }
  
});

// apply the routes to our application with the prefix /api
app.use('/api', appRouter);

// dummy route to get the token
app.get('/', function(req,res){
	var username = 'ardall';  // dummy username
	console.log(username + app.get('superSecret'));
	var token = jwt.sign(username, app.get('superSecret'), {
	  expiresInMinutes: 1440 // expires in 24 hours
	});
	res.json({
		token: token
	});
});

// setup all of the routers
['student', 'teacher', 'class'].map(function(controllerName) {
	try{
		var controller = require('./controllers/' + controllerName);
		controller.setup(app, db);
	}catch (e){
		console.log(controllerName + ' is not setup');
	}
 });
 
app.listen(port);
console.log('Express started on port' + port);