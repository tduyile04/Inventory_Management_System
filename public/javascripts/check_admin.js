$(document).ready(function() {
	console.log('im hjere');
	$('#login').on('submit', function {

		var superadminRef = ref.child('Admin');

	    superadminRef.on('value', function(snap) {
		  	var data = snap.val();

		  	var keys = Object.keys(data);

		  	for (var i = 0; i < keys.length; i++) {
		  		var key = keys[i];

		  		console.log(data[key].isAdmin);

		  		if (data[key].isAdmin) {
		  			//Show create admin button
		  			$('#create-admin').show();
		  			break;
		  		} else {
		  			//hide create admin button	  				  			
		  			$('#create-admin').hide();
		  		}
		  	}

	    });

	});	
});