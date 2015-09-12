var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('client-sessions');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  cookieName: 'session',
  secret: 'I_love_discover_your_talents',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.get('/', function(req, res) {
	
	if (JSON.stringify(req["query"]) === '{}')
	req.session.checkAuth=false;
else{ 
	req.session.checkAuth=true;
	req.session.authToken = JSON.stringify(JSON.parse(req["query"].auth).token);
	req.session.email = JSON.stringify(JSON.parse(req["query"].auth).password.email);
	req.session.uid = JSON.stringify(JSON.parse(req["query"].auth).uid);
	req.session.authenticated = true;
}
  res.render('home', {
    title: 'Welcome',
	checkAuth: req.session.checkAuth,
	authenticated: req.session.authenticated,
	authToken: req.session.authToken,
	uid: req.session.uid,
	message: "Welcome to my app, ready to get started? "
  });
}); 
app.get('/register', function(req, res) {
  res.render('register', {
    title: 'Register!'
  });
});
//app.use('/register',require('./views/register')());
app.use('/geniuses',function(req, res){
	
	if(req.session && req.session.email) {	
	res.render('listAllGeniuses', {
    title: 'List of All Geniuses',
	uid: req.session.uid,
	authenticated: req.session.authenticated});
	}
	else{
		req.session.reset();
		  res.render('home', {
		  title: 'Welcome',
	      checkAuth: req.session.checkAuth,
          authenticated: req.session.authenticated,
		authToken: req.session.authToken,
		message: "You have not Logged In yet, Please login to continue"
  });
		
	}
	
});


app.use('/addGenius',function(req, res){
	
	if(req.session && req.session.email) {	
	res.render('geniusInfo', {
    title: 'Add or Update a Genius',
	uid: req.session.uid,
	user: {},
	geniusFormInfo: {},
	authenticated: req.session.authenticated});
	}
	else{
		req.session.reset();
		  res.render('home', {
		  title: 'Welcome',
	      checkAuth: req.session.checkAuth,
          authenticated: req.session.authenticated,
		authToken: req.session.authToken,
		message:  "You are not Logged in. Please login to continue"
  });
		
	}
	
	}
	


);
app.use('/genius',function(req, res){


	if(req.session && req.session.email) {	
	res.render('geniusInfo', {
    title: 'Genius Info',
	uid : req.session.uid,
	authenticated: req.session.authenticated});
	}
	else{
		req.session.reset();
		  res.render('home', {
		  title: 'Welcome',
	      checkAuth: req.session.checkAuth,
          authenticated: req.session.authenticated,
		authToken: req.session.authToken,
	message: "You are not Logged in. Please login to continue"
  });
		
	} 
});

app.use('/addSuccess',function(req, res){


	if(req.session && req.session.email) {	
	res.render('home', {
    title: 'Add or Update Success',
	authenticated: req.session.authenticated,
	uid: req.session.uid,
	message: "Congratulations! User was saved successfully"
	});
	}
	else{
		req.session.reset();
		  res.render('home', {
		  title: 'Welcome',
	      checkAuth: req.session.checkAuth,
          authenticated: req.session.authenticated,
		authToken: req.session.authToken,
	message: "You are not Logged in. Please login to continue"
  });
		
	} 
});


app.use('/addFailed',function(req, res){


	if(req.session && req.session.email) {	
	res.render('home', {
    title: 'Add or Update Failed',
	authenticated: req.session.authenticated,
	uid: req.session.uid,
	message: "Sorry! We encountered some issue while saving user, please try again "
	});
	}
	else{
		req.session.reset();
		  res.render('home', {
		  title: 'Welcome',
	      checkAuth: req.session.checkAuth,
          authenticated: req.session.authenticated,
		authToken: req.session.authToken,
	message: "You are not Logged in. Please login to continue"
  });
		
	} 
});


app.get('/logout', function(req, res) {
	req.session.checkAuth=false;
	 req.session.authenticated=false;
	 	req.session.reset();
	req.session.authToken='';
	req.session.email='';
	req.session.uid = '',
	
  res.render('home', {
    title: 'Logged Out',
	message: "You have successfully logged out. Please close the window"
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    title: 'Login!'
  });
});
app.get('/home',function(req, res){
 res.render('home', {
    title: 'Welcome'
  });
  });
app.listen(process.env.PORT || 3000);