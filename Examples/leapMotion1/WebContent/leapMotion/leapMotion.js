function concatenation(id, data) {
	return id + ": " +data +"<br>";
}

function getFingerName(fingerType){
	switch(fingerType){
	case 0:
		return "Thumb";
	case 1:
		return "Index";
	case 2:
		return "Middle";
	case 3:
		return "Ring";
	case 4:
		return "Pinky";
	}
}

function concatJointPosition(id, position) {
	return id + position[0] + ", " + position[1] + ", " + position[2] +"<br>";
}

var output = document.getElementById('output');
var frameString = "", hamString = "", fingerString = "";
var hand, finger;
var wasPinched = false;
var wasGrab = false;
var oBus = sap.ui.getCore().getEventBus();
var wasRolledLeft = false;
var wasRolledRight = false;

//Leap.loop uses browsers request animation frame
var options = {enableGestures: true}
var rollLeft = 0;
var rollRight = 0;
var rollCount = 0;
var countUp = 0;
var countDown = 0;


Leap.loop(options, function(frame) {
	frameString = concatenation("frame_id", frame.id);
	frameString += concatenation("num_hands", frame.hands.length);
	frameString += concatenation("num_fingers", frame.fingers.length);
	frameString += "<br>"

		// Display Gesture object data
		if (frame.gestures.length > 0) {
			var g = frame.gestures[0];
			if (g.type === 'swipe' && g.state === 'stop') {
				// Get the absolute movement along the x and y axis
				var xMov = Math.abs(g.direction[0]);
				var yMov = Math.abs(g.direction[1]);
				if (xMov > 0.3) {
					if (g.direction[0] < 0) {
						console.log("Left");
						oBus.publish("leapMotion", "Left");
					}
					else {
						console.log("Right");
						oBus.publish("leapMotion", "Right");

					}
				}
				else if (yMov > 0.3) {
					if (g.direction[1] < 0) {
						console.log("Down");
						oBus.publish("leapMotion", "Down");
					}
					else {
						console.log("Up");
						oBus.publish("leapMotion", "Up");
					}
				}
			}

			if(g.type == "circle" && g.state === 'stop'){
				var circleProgress = g.progress;
				var completeCircles = Math.floor(circleProgress);
				var clockwise = false;
				var pointableID = g.pointableIds[0];
				var direction = frame.pointable(pointableID).direction;
				var dotProduct = Leap.vec3.dot(direction, g.normal);

				if (dotProduct  >  0 && completeCircles === 1) {
					console.log("circleClockwise");
					oBus.publish("leapMotion", "circleClockwise");
				}
				else if (dotProduct  <  0 && completeCircles === 1) {
					console.log;
					oBus.publish("leapMotion", "circleCounterClockwise")
				}
			}
		}

	hand = frame.hands[0];
	if (hand !== undefined){
		if (hand.pinchStrength === 1 && hand.confidence > 0.9){
			wasPinched = true;
		}
		else if (wasPinched === true){
			console.log("Pinched");
			oBus.publish("leapMotion", "Pinch");
			wasPinched = false;
		}
	}

	if (hand !== undefined){
		if (hand.grabStrength === 1 && hand.confidence > 0.5){
			wasGrab = true;
		}
		else if (wasGrab === true){
			console.log("Grab");
			oBus.publish("leapMotion", "Grab");
			wasGrab = false;
		}
		if (hand.roll() > 0.75){
			wasRolledLeft = true;
		}else if (wasRolledLeft === true){
			wasRolledLeft = false;
			oBus.publish("leapMotion", "HandRollLeft");
		}

		if (hand.roll() < -0.75){
			wasRolledRight = true;
		}else if (wasRolledRight === true){
			wasRolledRight = false;
			oBus.publish("leapMotion", "HandRollRight");
		}
	}
});
