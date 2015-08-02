var db = new Firebase("https://visionzero.firebaseio.com/");
var accidentsRef = db.child("accidents");
//var idRef = db.child("ids");

$(document).ready(function(){
	$("#submit-address").click(function(){
		getGeocode();
		initialize();
	});

	$("#reset").click(function(){
		initialize();
		markers = [];
		intersectionCoordinates = [];
	});

	$("#finish").click(function(){
		console.log(intersectionCoordinates);
		accidentsRef.push({
			coordinates: intersectionCoordinates,
		})
		alert("Thank you for your time.");
		window.location.reload();
	})
})


function formatDate(time){
	return time.toString("MMM dd hh:mm:ss"); // "Dec 20"
}