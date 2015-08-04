var lat;
var lng;
var zoom = 14;
var geocode;
var address;
var geocodeRequestURL;
var myLatLng;
var intersectionCoordinates = [];
var markers = [];

function getGeocode(){
	address = $("#address").val();
	geocodeRequestURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBPBS4476IYWCvYu9CJk0FaFXRP52YArn8";
	$.ajax({
		url: geocodeRequestURL,
		type: "GET",
		dataType: "json",
		success: function(res) {
            setGeocode(res.results);
        }
	})
}

function setGeocode(json){
	geocode = json[0].geometry.location;
	lat = geocode.lat;
	lng = geocode.lng;
}

function initialize() {
        var map = new google.maps.Map(document.getElementById('map-canvas'));
	map.setZoom(zoom);
	map.setCenter(new google.maps.LatLng(lat,lng))

	drawingManager = new google.maps.drawing.DrawingManager({
    		drawingMode: google.maps.drawing.OverlayType.MARKER,
    		drawingControl: true,
    		drawingControlOptions: {
      	        	position: google.maps.ControlPosition.TOP_CENTER,
      			drawingModes: [
        			google.maps.drawing.OverlayType.MARKER,
        			google.maps.drawing.OverlayType.POLYLINE,
      			]
    		},
    		markerOptions: {
			 icon: 'http://cdn.leafletjs.com/leaflet-0.4/images/marker-icon.png'
    		},
  	});
  	drawingManager.setMap(map);

  	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    		intersectionCoordinates.push(event.overlay.position);
    		markers.push(event);
 	});
}
