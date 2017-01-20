$(document).ready(function() {

	//Generates the list data for the table rows
	const ref = firebase.database().ref();
	const adminRef = ref.child('Admin');

	var admin;

	adminRef.on('value', function(snap) {
		admin = snap.val();
		//console.log(admin);

		var keys = Object.keys(admin);
		//console.log(keys);

		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			var count = i + 1;

			var $row = $('<tr>'+
			  '<td>'+ count +'</td>'+
		      '<td>' + admin[k].email + '</td>' +
		      '<td><a href="">' + "edit" + '</a></td>' +
		      '<td><a href="">' + "delete" + '</a></td>' +
		      '</tr>');    
			
			$('#admin-list > tbody:last').append($row);
		}
	});

});