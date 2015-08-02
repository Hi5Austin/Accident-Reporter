// Get a database reference to our posts
var db = new Firebase("https://visionzero.firebaseio.com/");
var intersections = [];
var geoArray;
var id = 0;
// Attach an asynchronous callback to read the data at our posts reference
db.on("value", function(snapshot) {
  intersections = snapshot.val();
  render(intersections);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

//Load all of this onto the page
function render(fireref) {
	accidents = fireref.accidents;
	//console.log(accidents);
	for (var accident in accidents) {
   		if (accidents.hasOwnProperty(accident)) {
       		geoArray = accidents[accident].coordinates;
       		console.log(accidents[accident]["date"]);
       		id += 1;
       		$("body").append("<h1>Set "+ id +"</h1>");
       		var html = "";
       		for(var i = 0; i < geoArray.length;i++){
       			html += "<p>" + geoArray[i]["G"] + "," + geoArray[i]["K"] + "</p>";
       		}
       		$("body").append(html);
       		//$("body").append("<h1>End</h1>");
    	}
	}
}