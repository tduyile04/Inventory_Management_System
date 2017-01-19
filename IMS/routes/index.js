var express = require('express');
var router = express.Router();
var firebase = require('firebase');

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBHrSYC6n_i-n7PE1EM0Vb09mwSwbe2kQE",
	authDomain: "inventory-management-sys-d56ef.firebaseapp.com",
	databaseURL: "https://inventory-management-sys-d56ef.firebaseio.com",
	storageBucket: "inventory-management-sys-d56ef.appspot.com",
	messagingSenderId: "660190924151"
};
firebase.initializeApp(config);

var session;
var assetname;
var ref = firebase.database().ref();

/* Get the Home page */
router.get('/admin', function(req,res) {

	res.render('index', {title: 'Home'});

});

/* View details of the asset and assign if free */
router.get('/admin/asset/:assetname', function(req,res) {

	var assetname = req.params.assetname;
	var data;
	var sn;
	var code;
	var date;
	var desc;

	var assetRef = ref.child('asset-list');
	assetRef.orderByChild('assetName')
		.equalTo(assetname)
		.limitToFirst(1)
		.on('value', function(snap) {
			data = snap.val();
			console.log(data);

			var keys = Object.keys(data);
			var key = keys[0];

			sn = data[key].serialNum;
			code = data[key].andelaCode;
			date = data[key].datePurchased;
			desc = data[key]['description'];

			res.render('view_asset', { title:'Asset Details',
									   asset_name: assetname,
									   serial_number: sn,
									   andela_code: code,
									   date_purchased: date,
									   description: desc });

		});

});

router.post('/admin/asset/:assetname', function(req, res) {
	console.log('check if called');
	var assetname = req.body.asset;
	var code = req.body.andelacode;
	var ass_by = req.body.assigner;
	var ass_to = req.body.assignee;
	var time = req.body.duration;

	var itemRef = ref.child('Assigned Items').push({
		Asset: assetname,
		Andelacode: code,
		Assigner: ass_by,
		Assignee: ass_to,
		Duration: time
	});

	itemRef.then(function() {
		ref.child('asset-list')
			.orderByChild('assetName')
			.equalTo(assetname)
			.limitToFirst(1)
			.on('value', function(snap) {
				data = snap.val();
				console.log(data);

				var keys = Object.keys(data);
				var key = keys[0];

				var update_assetRef = ref.child('asset-list').child(key).update({ availability: 'in-use' });
				update_assetRef.then(function() { 
				res.redirect('/admin');
				});
			});
	});
	itemRef.catch(function(e) {
		console.log('Error is: ' + e.stack);
	});
	
});

/* GET log in page. */
router.get('/', function(req, res) {

  res.render('login', { title: 'Log In Page' });

});



router.post('/', function(req, res) {
	//Create user authentication

	var email = req.body.email;
	var pass = req.body.password;
	const auth = firebase.auth();

	const promise = auth.signInWithEmailAndPassword(email, pass);

	promise
	.then(function(user) {
      console.log('accepted');
      res.redirect('/admin');

      console.log('Success!');
    });
    promise
	.catch(function(e) {
		console.log(e.message);
      	res.status(500).send({message: 'Login Failed'});
      	res.redirect('/');
	});
/*
	firebase.auth().OnAuthStateChanged(function(user, err) {
		if (user) {
			//redirect user to home page
			console.log(success);
			res.redirect('/admin');
		}
		else {
			console.log('Error signing in' + err);
		}
	});*/

});

/* Get the create new admin page */
router.get('/admin/new', function(req, res) {

	res.render('new_admin', { title: 'New Admin'});
});

router.post('/admin/new', function(req, res, next) {

	var email = req.body.email;
	var pass = req.body.password;

	var adminRef = ref.child('Admin').push({
		email: email,
		password: pass 
	});

	const auth = firebase.auth();

	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise
	.then(function() {
		res.redirect('/admin');
	});
	promise
	.catch(function(e) {
		console.log(e.message);
	});
});


/*Get the create new asset page*/
router.get('/admin/asset', function(req, res) {
	res.render('new_asset', {title: 'New asset'});
});
router.post('/admin/asset', function(req,res) {
	var asset = req.body.assetname;
	var serial = req.body.serialnumber;
	var andela_code = req.body.andelacode;
	var date = req.body.datebought;
	var desc = req.body.description;

	var assetRef = ref.child('asset-list').push({
		assetName: asset,
		serialNum: serial,
		andelaCode: andela_code,
		datePurchased: date,
		description: desc,
		availability: 'free'
	});
	res.redirect('/admin');
});

/* Log out page */
router.get('/logout',function(req,res){

	const auth = firebase.auth().signOut();
	
	res.redirect('/');
});

module.exports = router;
