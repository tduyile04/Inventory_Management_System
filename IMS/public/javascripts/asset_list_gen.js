$(document).ready(function() {

	//Generates the list data for the table rows
	const ref = firebase.database().ref();
	const assetRef = ref.child('asset-list');

	var assets;

	assetRef.on('value', function(snap) {
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
		      '<td><a class="delete" href="/delete/' + assets[k].assetName + '"' + '>' + "delete" + '</a></td>' +
/*		      '<td><a href="">' + "delete" + '</a></td>' +
*/		      '</tr>');    
			
			$('#assets-list > tbody:last').append($row);
		}
	});

});