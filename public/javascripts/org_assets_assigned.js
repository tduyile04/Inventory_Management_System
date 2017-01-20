$(document).ready(function() {

	var superadminRef = ref.child('asset-list');

	$('#add-new-asset').click(function() {

		var assignType = $('#add-new-asset').val();

		if (assignType == 'all') {

			superadminRef.on('value', function(snap) {
				assets = snap.val();
				//console.log(assets);

				var keys = Object.keys(assets);
				//console.log(keys);

				for (var i = 0; i < keys.length; i++) {
					var k = keys[i];
					var count = i + 1;

					var $row = $('<tr>'+
					  '<td>'+ count +'</td>'+
				      '<td>' + assets[k].assetName + '</td>' +
				      '<td>' + assets[k].availability + '</td>' +
				      '<td><a class="view" href="/asset/' + assets[k].assetName + '"' + '>' + "view" + '</a></td>' +
				      '<td><a href="">' + "delete" + '</a></td>' +
				      '</tr>');    
					
					$('#assets-list > tbody:last').append($row);
				}
			});


		} else {

			superadminRef
		    .orderByChild('availability')
		    .equalTo('assignType')
		    .on('value', function(snap) {

			  	var assets = snap.val();
			  	var keys = Object.keys(assets);

			  	for (var i = 0; i < keys.length; i++) {
					var k = keys[i];
					var count = i + 1;

					var $row = $('<tr>'+
					  '<td>'+ count +'</td>'+
				      '<td>' + assets[k].assetName + '</td>' +
				      '<td>' + assets[k].availability + '</td>' +
				      '<td><a class="view" href="/asset/' + assets[k].assetName + '"' + '>' + "view" + '</a></td>' +
				      '<td><a href="">' + "delete" + '</a></td>' +
				      '</tr>');    
					
					$('#assets-list > tbody:last').append($row);
				}

	    	});
		}
	    
	});

});
