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
var ref = firebase.database().ref();

/* Get the Home page */
router.get('/admin', function(req,res) {

	res.render('index', {title: 'Home'});

});

/* View details of the asset and assign if free */
/*router.get('/admin/asset/:assetname', function(req,res) {

	var assetname = req.params.assetname;
	var data;
	var sn;
	var code;
	var date;

	assetRef = ref.child('asset-list');
	assetRef.orderByChild('assetName')
		.equalTo(assetname)
		.limitToFirst(1)
		.on('value', function(snap) {
			data = snap.val();
			//console.log(data);

		var keys = Object.keys(data);
		var key = keys[0];
		});
		sn = data[key].serialNum;
		code = data[key].andelaCode;
		date = data[key].datePurchased;

		res.render('view_asset', { title:'Asset Details',
								   asset_name: assetname,
								   serial_number: sn,
								   andela_code: code,
								   date_purchased: date });


});*/

router.get('/admin/asset/:assetname', function(req,res) {

	var assetname = req.params.assetname;

	res.render('view_asset', { title:'Asset Details',
							   asset_name: assetname });

});

router.post('/admin/asset/:assetname', function(req,res) {

	var assetname = req.body.asset;
	var code = req.body.andelacode;
	var ass_by = req.body.assigner;
	var ass_to = req.body.assignee;
	var time = req.body.duration;

	var assignRef = ref.child('assignedItems').push({
		asset: assetname,
		andelacode: code,
		assigner: ass_by,
		assignee: ass_to,
		duration: time
	});
	res.redirect('/admin');

});

/* GET log in page. */
router.get('/', function(req, res) {

  res.render('login', { title: 'Log In Page' });

});



router.post('/', function(req, res) {

/*	session = req.session;
	if (req.body.email == 'admin' && req.body.password == 'admin') {
		session.userId = req.body.email;
	}
	//console.log(session.userId);

	 res.redirect('/redirects');
});

router.get('/redirects', function(req, res) {
	if (session.userId) {
		res.redirect('/admin');
	}
	else {
		res.redirect('/');
	}*/
});

/* Get the create new admin page */
router.get('/admin/new', function(req, res) {

	res.render('new_admin', { title: 'New Admin'});
});

router.post('/admin/new', function(req, res, next) {

	var user = req.body.email;
	var pwd = req.body.password;

	var adminRef = ref.child('Admin').push({
		email: user,
		password: pwd 
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
	session = req.session;
	session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    res.redirect('/');
	  }
	});
});

module.exports = router;
