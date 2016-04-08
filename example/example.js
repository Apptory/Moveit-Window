/* Moveit.js Example Script */
$(document).ready(function() {
	
	$(".moveable").moveable();

	/* Move Start Listener */
	$(".moveable").on("moveit:start", function(event) {
		console.log("Moveit: Starting..", event);
	}).on("moveit:stop", function(event) {
		console.log("Moveit: Stopped..", event);
	}).on("moveit:move", function(event) {
		console.log("Moveit: Moving..", event);
	});
});